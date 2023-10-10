import 'package:freezed_annotation/freezed_annotation.dart';

part 'series_results.freezed.dart';
part 'series_results.g.dart';

enum ResultsStatus {
  provisional,
  published,
}

@unfreezed
class Results with _$Results {
  const factory Results({
    required DateTime publishedOn,
    required ResultsStatus status,
    required String name,
    required String fleet,
    required SeriesResults seriesResults,
  }) = _Results;
  const Results._();

  factory Results.fromJson(Map<String, Object?> json) =>
      _$ResultsFromJson(json);

  addResult() {}
}

/// Data related to the results for a series.
@unfreezed
class SeriesResults with _$SeriesResults {
  const factory SeriesResults({
    @Default([]) List<SeriesCompetitor> competitors,

    /// List of list of results indexed by race as the first index and position as the second (eg Series[race][position].
    @Default([[]]) List<List<SeriesResult>> results,
  }) = _SeriesResults;

  const SeriesResults._();

  factory SeriesResults.fromJson(Map<String, Object?> json) =>
      _$SeriesResultsFromJson(json);
}

typedef SeriesCompetitor = ({
  String helm,
  String? crew,
  String boatClass,
  int sailNumber,
  String name,
  num totalPoints,
  num netPoints,
  int position,
  num? handicap,
});

typedef SeriesResult = ({
  int points,
  bool isDiscard,
});
