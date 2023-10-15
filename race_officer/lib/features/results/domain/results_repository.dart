
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';

class ResultsRepository {


  /// Publish race results
  publish(RaceResults raceResults, SeriesResults seriesResults) {

  }
}

final resultsRepositoryProvider = Provider((ref) => ResultsRepository());
