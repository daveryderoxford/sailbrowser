import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/results_repository.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/scoring/race_scorer.dart';
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
    // OK? - does not trigger rebuild as state never changes
    // it just triggers a aide efffect of marking competitors dirty. 
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
  _calcRaceResultInternal(RaceResults raceResults) {
    final competitors = ref.read(currentCompetitors).requireValue;
    final raceCompetitors = competitors
        .where((comp) =>
            comp.raceId == raceResults.raceId &&
            comp.resultCode != ResultCode.notFinished)
        .toList();

    final raceData = ref
        .read(allRaceDataProvider)
        .requireValue
        .firstWhereOrNull((data) => data.race.id == raceResults.raceId);

    final compResults = raceScorer.calculateRaceResults(
        raceCompetitors, raceData!.fleet.handicapScheme, raceData.race);

    raceResults.results = compResults;
    raceResults.dirty = false;

    return raceResults;

  }

  computeSeriesResults(SeriesResults seriesResults) {
    // Compute race results for all dirty races
    final races = seriesResults.races
        .map<RaceResults>(
            (race) => race.dirty ? _calcRaceResultInternal(race) : race)
        .toList();
    seriesResults.races = races;

    // Compute series results
    final series = ref.read(seriesProvider(seriesResults.seriesId));

    seriesScorer.calculateSeriesResults(
        seriesResults, seriesResults.races, series!.scoringScheme);
    seriesResults.dirty = false;

    // Save updated state for the series
    state = AsyncValue.data(state.value!
        .map<SeriesResults>(
            (s) => (s.seriesId == seriesResults.seriesId) ? seriesResults : s)
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

/// If a competitor is modified or removed then mark
/// series and race as dirty so results are re-computed.
final competitorsDirty = Provider((ref) {
  final changed = ref.watch(changedCompetitors);
  changed.when(
      skipLoadingOnReload: true,
      data: (changes) {
        final res = ref.read(resultsService.notifier);
        for (var change in changes) {
          // Only mark if changed or removed.
          // Newly added  should have dirty set
          if (change.type != DocumentChangeType.added) {
            final comp = change.competitor;
            res.markRaceAsDirty(comp.raceId, comp.seriesId);
            res.markSeriesAsDirty(comp.seriesId);
          }
        }
      },
      error: (Object error, StackTrace stackTrace) =>
          logError('Error ${error.toString()}'),
      loading: () => {});
});
