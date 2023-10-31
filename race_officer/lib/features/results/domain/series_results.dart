import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scoring.dart';
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
  factory SeriesResults({
    DateTime? publishedOn,
    @Default(ResultsStatus.provisional) ResultsStatus status,
    required String season,
    required String name,
    required String seriesId,
    required String fleetId,
    @TimestampSerializer() required DateTime startDate,
    @TimestampSerializer() required DateTime endDate,
    required SeriesScoringData scoringScheme,
    required List<RaceResults> races, // Cant use default and allow to add to the list
    required List<SeriesCompetitor> competitors,  // Cant use default and allow to add to the list
  }) = _SeriesResults;

  const SeriesResults._();

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

@Freezed(addImplicitFinal: false, makeCollectionsUnmodifiable: false)
class SeriesCompetitor with _$SeriesCompetitor {
  factory SeriesCompetitor({
    required String helm,
    String? crew,
    required String boatClass,
    required int sailNumber,
    @Default('') String name,
    @Default(99999) num totalPoints,
    @Default(99999) num netPoints,
    @Default(99999) int position,
    num? handicap,
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
      handicap: comp.handicap,
    );
  }

  factory SeriesCompetitor.fromJson(Map<String, Object?> json) =>
      _$SeriesCompetitorFromJson(json);
}

typedef SeriesResultData = ({
  num points,
  ResultCode resultCode,
  bool isDiscard,
});
