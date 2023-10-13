import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';

part 'race_result.freezed.dart';
part 'race_result.g.dart';

@unfreezed
class RaceResults with _$RaceResults {
  factory RaceResults({
    required DateTime publishedOn,
    required ResultsStatus status,
    required String name,
    required DateTime date,
    required String fleet,
    required int index,
    //  @Default([]) List<RaceResult> results,
  }) = _RaceResults;

  const RaceResults._();

  factory RaceResults.fromJson(Map<String, Object?> json) =>
      _$RaceResultsFromJson(json);
}

@unfreezed
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
    //  @Default([]) List<RaceResult> results,
  }) = _RaceResult;

  const RaceResult._();

  factory RaceResult.fromJson(Map<String, Object?> json) =>
      _$RaceResultFromJson(json);
}
