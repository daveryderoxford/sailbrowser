import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/results_repository.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/scoring/race_scorer.dart';
import 'package:sailbrowser_flutter/features/results/scoring/rating_system.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scorer.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

/// Results currently being
class ResultsService extends AsyncNotifier<List<SeriesResults>> with UiLoggy {
  ResultsService(this.seriesScorer, this.raceScorer);

  final RaceScorer raceScorer;
  final SeriesScorer seriesScorer;

  /// Get series results when not in erro/loading state

  SeriesResults? _getSeriesResult(String id) {
    final results = state.hasValue ? state.value : <SeriesResults>[];
    return results?.firstWhereOrNull((s) => (s.seriesId == id));
  }

  @override
  build() async {
    ref.watch(competitorsDirty);

    final results = state.hasValue ? state.value : <SeriesResults>[];

    /// Recompute the state whenever the selected race changes.
    final selected = ref.watch(selectedRacesProvider);

    for (var raceData in selected) {
      /// Read/create series results if they do not exist
      var seriesResult =
          results!.firstWhereOrNull((s) => raceData.series.id == s.seriesId);
      if (seriesResult == null) {
        seriesResult =
            await ref.read(resultsRepositoryProvider).read(raceData.series.id);
        // If the serieds result is not stored then create it
        seriesResult = SeriesResults.fromSeries(raceData.series);
        results.add(seriesResult);
      }

      /// If race result does not exist create it
      final raceResult = seriesResult.races
          .firstWhereOrNull((r) => r.raceId == raceData.race.id);
      if (raceResult == null) {
        final raceResult = RaceResults.fromRace(raceData.race);
        seriesResult.races.add(raceResult);
      }
    }
    return (results!);
  }

  /// Mark race as dirty so results get regenerated
  markRaceAsDirty(String raceId, String seriesId) {
    if (state.hasValue) {
      final seriesResult = _getSeriesResult(seriesId);
      final raceResult =
          seriesResult!.races.firstWhereOrNull((race) => race.raceId == raceId);
      raceResult!.dirty = true;
    } else {
      logWarning('Setting dirty flag ingored as no state value');
    }
  }

  /// Merk series as dirty.
  /// All races in the series are also marked as dirty.
  markSeriesAsDirty(String seriesId) {
    if (state.hasValue) {
      final seriesResult = _getSeriesResult(seriesId);
      seriesResult!.dirty = true;
    } else {
      logWarning('Setting series dirty flage ignored as no state value');
    }
  }

  /// Get data required to calculate race results and calculated the results.
  RaceResults _calcRaceResultInternal(RaceResults raceResults) {
    final competitors = ref.read(currentCompetitors).requireValue;
    final raceCompetitors =
        competitors.where((comp) => comp.raceId == raceResults.raceId).toList();

    final race = ref.read(raceProvider(raceResults.raceId));
    final series = ref.read(seriesProvider(race!.seriesId));

    final compResults = raceScorer.calculateRaceResults(
        raceCompetitors, RatingSystem.py, race);
    final upddate = raceResults.copyWith(results: compResults);

    upddate.dirty = false;

    return upddate;
  }

  computeSeriesResults(SeriesResults seriesResults) {
    // Compute race results for all dirty races
    final races = seriesResults.races
        .map<RaceResults>(
            (race) => race.dirty ? _calcRaceResultInternal(race) : race)
        .toList();
    seriesResults.races = races;
    final series = ref.read(seriesProvider(seriesResults.seriesId));

    // Compute series results
    final update = seriesScorer.calculateSeriesResults(
        seriesResults, seriesResults.races, series!);
    update!.dirty = false;

    // Save updated state for the series
    state = AsyncValue.data(state.value!
        .map<SeriesResults>((s) => (s.seriesId == update.seriesId) ? update : s)
        .toList());
  }
}

final resultsService =
    AsyncNotifierProvider<ResultsService, List<SeriesResults>>(
        () => ResultsService(SeriesScorer(), RaceScorer()));

final raceResultsProvider = Provider((ref) {
  List<RaceResults> allRaces = [];

  final seriesResults = ref.watch(resultsService).valueOrNull;
  if (seriesResults == null) return [];

  for (var series in seriesResults) {
    allRaces.addAll(series.races);
  }
  // allRaces.sort((a, b) => SeriesService.sortRaceData(a, b));

  return allRaces;
});

/// If a competitor is modified, added or removed then mark
/// seriesn and race as diretly so results are re-computed.
final competitorsDirty = Provider((ref) {
  final changed = ref.watch(changedCompetitors);
  changed.when(
      skipLoadingOnReload: true,
      data: (changes) {
        final res = ref.watch(resultsService.notifier);
        for (var change in changes) {
          final comp = change.competitor;
          res.markRaceAsDirty(comp.raceId, comp.seriesId);
          res.markSeriesAsDirty(comp.seriesId);
        }
      },
      error: (Object error, StackTrace stackTrace) =>
          logError('Error ${error.toString()}'),
      loading: () => {});
});
