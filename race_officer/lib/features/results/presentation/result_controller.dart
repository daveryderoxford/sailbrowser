import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series_service.dart';

typedef ResultsState = ({Series? series, Race? race});

enum PublishResultsOptions {
  allRaces,
  selectedRace, 
}

/// Controller for results display
class ResultsController extends Notifier<ResultsState> {

@override
 ResultsState build() {
    return(series: null, race: null);
  }

  /// Set the race to display results for
  /// The series displayed is set to the series the race part of
  displayRace(Race r) {
    final series = ref.read(seriesProvider(r.seriesId));
    state = (race: r, series: series);
  }

  /// Set the series to display results for.
  /// The race displayed is cleared 
  displaySeries(Series s)  => state = (race: null, series: state.series);

  /// Publish eother the selected race or all Results
  publishResults(PublishResultsOptions option) {
  }
}

final resultsController =
    NotifierProvider<ResultsController, ResultsState>(ResultsController.new);
