import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/firebase/timestamp_serialiser.dart';

part 'race_competitor.freezed.dart';
part 'race_competitor.g.dart';

///
@freezed
class RaceCompetitor with _$RaceCompetitor {
  factory RaceCompetitor({
    required String id,
    required String raceId,
    required String seriesId,
    required String helm,
    String? crew,
    required String boatClass,
    required int sailNumber,
    required num handicap,
    @TimestampSerializer() DateTime? finishTime,
    @Default(Duration()) Duration elapsedTime,
    @Default(Duration()) Duration correctedTime,
    @Default(ResultCode.notFinished) ResultCode resultCode,
    @Default([]) List<DateTime> lapTimes,
    ResultData? result,
  }) = _RaceCompetitor; 

  const RaceCompetitor._();

  factory RaceCompetitor.fromJson(Map<String, Object?> json) =>
      _$RaceCompetitorFromJson(json);

  get numLaps => lapTimes.length;

  get helmCrew =>  (crew != null && crew!.trim().isNotEmpty)
        ? '$helm / $crew}'
        : helm;
}

/// Results data that depends on other competitors in the race
@freezed
class ResultData with _$ResultData {
  factory ResultData({
    required int position,
    @Default(0) num points,
    required bool isDiscarded,
    required bool isDiscardable,
  }) = _ResultData;

  const ResultData._();

  factory ResultData.fromJson(Map<String, Object?> json) =>
      _$ResultDataFromJson(json);
}
