import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';

part 'race_result.freezed.dart';
part 'race_result.g.dart';

@Freezed(addImplicitFinal: false, makeCollectionsUnmodifiable: false)
class RaceResults with _$RaceResults {
  factory RaceResults({
    DateTime? publishedOn,
    @Default(ResultsStatus.provisional) ResultsStatus status,
    required String name,
    required DateTime date,
    required String fleet,
    required int index,
    required String raceId,
    @Default([]) List<RaceResult> results,
  }) = _RaceResults;

  const RaceResults._();

  factory RaceResults.fromJson(Map<String, Object?> json) =>
      _$RaceResultsFromJson(json);

  factory RaceResults.fromRace(Race race) {
    return RaceResults(
      date: race.scheduledStart,
      fleet: race.fleetId,
      index: race.index,
      name: race.name,
      raceId: race.id,
    );
  }
}

@Freezed(addImplicitFinal: false, makeCollectionsUnmodifiable: false)
class RaceResult with _$RaceResult {
  factory RaceResult({
    required String helm,
    @Default("") String crew,
    @Default("") String boatClass,
    required int sailNumber,
    String? name,
    required String position,
    required num points,
    @Default(0) double handicap,
    required ResultCode resultCode,
    required Duration elapsed,
    required Duration corrected,
  }) = _RaceResult;

  const RaceResult._();

  /// Competitor has finished OK
  get isOk => resultCode == ResultCode.ok;

  factory RaceResult.fromJson(Map<String, Object?> json) =>
      _$RaceResultFromJson(json);
}
