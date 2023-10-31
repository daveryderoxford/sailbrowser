import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/results_repository.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/scoring/race_scorer.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scorer.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

/// Results currently being
class ResultsService extends AsyncNotifier<List<SeriesResults>> {
  ResultsService(this.seriesScorer, this.raceScorer);

  final RaceScorer raceScorer;
  final SeriesScorer seriesScorer;
  bool initialised = false;

  @override
  build() async {
    ref.watch(competitorsDirty);

    final results = state.hasValue ? state.value : <SeriesResults>[];

    /// Recompute the state whenever the selected race changes.
    final selected = ref.watch(selectedRacesProvider);

    for (var data in selected) {
      /// Read/create series results if they do not exist
      var seriesResult =
          results!.firstWhereOrNull((s) => data.series.id == s.seriesId);
      if (seriesResult == null) {
        seriesResult =
            await ref.read(resultsRepositoryProvider).read(data.series.id);
        // If the serieds result is not stored then create it
        seriesResult ??= SeriesResults.fromSeries(data.series);
        results.add(seriesResult);
      }

      /// If race result does not exist create it
      final raceResult =
          seriesResult.races.firstWhereOrNull((r) => r.raceId == data.race.id);
      if (raceResult == null) {
        final raceResult = RaceResults.fromRace(data.race);
        seriesResult.races.add(raceResult);
      }
    }
    return (results!);
  }

  /// Mark race as dirty so results get regenerated
  markRaceAsDirty(String raceId) {
  }

  /// Merk series as drity
  markSeriesAsDirty(String seriesId) {}
}

final resultsService =
    AsyncNotifierProvider<ResultsService, List<SeriesResults>>(
        () => ResultsService(SeriesScorer(), RaceScorer()));

final raceResultsProvider = Provider((ref) {
  List<RaceResults> allRaces = [];

  final seriesResults = ref.watch(resultsService).valueOrNull;
  if (seriesResults == null) return [];

  for (var series in seriesResults!) {
    allRaces.addAll(series.races);
  }
  // allRaces.sort((a, b) => SeriesService.sortRaceData(a, b));

  return allRaces;
});

final competitorsDirty = Provider((ref) {
  final changed = ref.watch(changedCompetitors).value;
  final res = ref.watch(resultsService.notifier);
  if (changed != null) {
    for (var comp in changed) {
      res.markRaceAsDirty(comp.raceId);
      res.markSeriesAsDirty(comp.seriesId);
    }
  }
});
