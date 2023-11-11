import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scoring_data.dart';
import 'package:sailbrowser_flutter/firebase/timestamp_serialiser.dart';

part 'series_results.freezed.dart';
part 'series_results.g.dart';

enum ResultsStatus {
  provisional,
  published,
}

/// Read-only class representing results for a series.
@unfreezed
class SeriesResults with _$SeriesResults {
  factory SeriesResults(
      {
      @TimestampSerializer() DateTime? publishedOn,
      @Default(ResultsStatus.provisional) ResultsStatus status,
      required String season,
      required String name,
      required String seriesId,
      required String fleetId,
      @TimestampSerializer() required DateTime startDate,
      @TimestampSerializer() required DateTime endDate,
      required SeriesScoringData scoringScheme,
      required List<RaceResults>
          races, // Cant use default and allow to add to the list
      required List<SeriesCompetitor>
          competitors, // Cant use default and allow to add to the list
      @Default(true) bool dirty}) = _SeriesResults;

  SeriesResults._();

  factory SeriesResults.fromSeries(Series series) {
    return SeriesResults(
      season: series.season,
      name: series.name,
      seriesId: series.id,
      fleetId: series.fleetId,
      scoringScheme: series.scoringScheme,
      startDate: series.startDate!,
      endDate: series.endDate!,
      races: [],
      competitors: [],
    );
  }

  factory SeriesResults.fromJson(Map<String, Object?> json) =>
      _$SeriesResultsFromJson(json);
}

@unfreezed
class SeriesCompetitor with _$SeriesCompetitor {

  factory SeriesCompetitor({
    required String helm,
    String? crew,
    required String boatClass,
    required int sailNumber,
    String? name,
    @Default(99999) double totalPoints,
    @Default(99999) double netPoints,
    @Default(99999) int position,
    double? handicap,

    /// List of results for each race, ordered by the race
    @Default([]) List<SeriesResultData> results,
  }) = _SeriesCompetitor;

  SeriesCompetitor._();

  factory SeriesCompetitor.fromRaceResult(RaceResult comp) {
    return SeriesCompetitor(
      helm: comp.helm,
      crew: comp.crew,
      boatClass: comp.boatClass,
      sailNumber: comp.sailNumber,
      name: comp.name,
      handicap: comp.handicap,
    );
  }

  factory SeriesCompetitor.fromJson(Map<String, Object?> json) =>
      _$SeriesCompetitorFromJson(json);
}

@unfreezed
class SeriesResultData with _$SeriesResultData {
  factory SeriesResultData({
    required double points,
    required ResultCode resultCode,
    required bool isDiscard,
  }) = _SeriesResultData;

  SeriesResultData._();

  factory SeriesResultData.fromJson(Map<String, Object?> json) =>
      _$SeriesResultDataFromJson(json);
}
