import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';

part 'series_results.freezed.dart';
part 'series_results.g.dart';

enum ResultsStatus {
  provisional,
  published,
}

/// Read-only class representing results for a series. 
@unfreezed
class SeriesResults with _$SeriesResults {
   factory SeriesResults({
     required DateTime publishedOn,
    required ResultsStatus status,
    required String name,
    required String fleet,
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
  ResultCode resulktCode,
  bool isDiscard,
});
