import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/results_service.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/scoring/race_scorer.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scorer.dart';

part 'result_controller.freezed.dart';

@freezed
class ResultsState with _$ResultsState {
  factory ResultsState({
    RaceResults? displayedRace,
    SeriesResults? displayedSeries,
  }) = _ResultsState;

  const ResultsState._();
}

enum PublishResultsOptions {
  allRaces,
  selectedRace,
}

/// State for results display. 
class ResultsController extends Notifier<ResultsState> {
  ResultsController(this.seriesScorer, this.raceScorer);

  final RaceScorer raceScorer;
  final SeriesScorer seriesScorer;

  @override
  ResultsState build() {
    return ResultsState();
  }

  /// Set the race to display results for
  /// The series displayed is set to the series the race part of
  displayRace(RaceResults r) {
    //final series = ref.read(seriesProvider(r.seriesId));
    final results = ref.read(resultsService);
   //final series = results.requireValue.firstWhereOrNull((res) => res.seriesId == r.seriesId)

    state = state.copyWith(
      displayedRace: r,
    //  displayedSeries: series,
    );
  }

  /// Set the series to display results for.
  /// The race displayed is cleared
  displaySeries(SeriesResults s) {
    state = state.copyWith(displayedRace: null, displayedSeries: s);
  }

  /// Publish eother the selected series or all Results
  publishResults(PublishResultsOptions option, ResultsStatus status) {
    // ref.read(resultsRepositoryProvider).publish(seriesResults, status);
  }
}

final resultsController =
    NotifierProvider<ResultsController, ResultsState>( () => ResultsController(SeriesScorer(), RaceScorer()));

