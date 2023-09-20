import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/firebase/timestamp_serialiser.dart';

part 'race_competitor.freezed.dart';
part 'race_competitor.g.dart';

@freezed
class RaceCompetitor with _$RaceCompetitor {
  factory RaceCompetitor({
    required String id,
    required String raceId,
    required String helm,
    String? crew,
    required String boatClass,
    required int sailNumber,
    required num handicap,
    @TimestampSerializer() DateTime? finishTime,
    @Default(0) int laps,
    @Default([]) List<DateTime> lapTimes,
    ResultData? result,
  }) = _RaceCompetitor;

  const RaceCompetitor._();

  factory RaceCompetitor.fromJson(Map<String, Object?> json) =>
      _$RaceCompetitorFromJson(json);
}

@freezed
class ResultData with _$ResultData {
  factory ResultData({
    required int position,
    @Default(0) num points,
    required Duration elapsedTime,
    required Duration correctedTime,
    required ResultCode resultCode,
    required bool isDiscarded,
    required bool isDiscardable,
  }) = _ResultData;

  const ResultData._();

  factory ResultData.fromJson(Map<String, Object?> json) =>
      _$ResultDataFromJson(json);
}
