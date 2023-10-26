import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series_service.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/scoring/race_scorer.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scorer.dart';

part 'result_controller.freezed.dart';

@freezed
class ResultsState with _$ResultsState {
  factory ResultsState({
    Series? displayedSeries,
    Race? displayedRace,
    RaceResult? displayRaceResult,
    SeriesResults? displayedSeriesResult,
    @Default(0) int tabIndex,
    @Default([]) List<SeriesResults> results,
  }) = _ResultsState;

  const ResultsState._();
}

enum PublishResultsOptions {
  allRaces,
  selectedRace,
}

/// Controller for results display
class ResultsController extends Notifier<ResultsState> {
  ResultsController(this.seriesScorer, this.raceScorer);

  final RaceScorer raceScorer;
  final SeriesScorer seriesScorer;

  @override
  ResultsState build() {
    return (ResultsState());
  }

  displayTab(int index) {
    state = state.copyWith(tabIndex: index);
  }

  /// Set the race to display results for
  /// The series displayed is set to the series the race part of
  displayRace(Race r) {
    final series = ref.read(seriesProvider(r.seriesId));

    state = state.copyWith(
      displayedRace: r,
      displayedSeries: series,
      displayedSeriesResult: _getSeriesResult(series!),
    );
  }

  /// Gets a series result from its Id.  If the
  SeriesResults? _getSeriesResult(Series series) {
    return state.results.firstWhere(
        (seriesResult) => seriesResult.seriesId == series.id,
        orElse: () => _computeSeriesResult(series));
  }

  SeriesResults _computeSeriesResult(Series series) {
    var sr = SeriesResults.fromSeries(series);

    // Score the seris
    return sr;
  }

  /// Set the series to display results for.
  /// The race displayed is cleared
  displaySeries(Series s) {
    // Find series result or create a noew one if one does not exist.
    var result = state.results.singleWhere((element) => false,
        orElse: () => SeriesResults.fromSeries(s));

    state = state.copyWith(displayedRace: null, displayedSeries: s);
  }

  /// Mark race as dirty so results get regenerated
  markRaceAsDirty(String raceId) {}

  markSeriesAsDirty(String seriesId) {}

  /// Publish eother the selected series or all Results
  publishResults(PublishResultsOptions option, ResultsStatus status) {
    // ref.read(resultsRepositoryProvider).publish(seriesResults, status);
  }
}

final resultsController =
    NotifierProvider<ResultsController, ResultsState>( () => ResultsController(SeriesScorer(), RaceScorer()));
