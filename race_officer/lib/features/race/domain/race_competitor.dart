import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';

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
    required double handicap,

    /// Finish time recored when competitor finishes.
    /// If a manual finish time set by hand is specified it is used in preference.
    /// The recorded finish time is null if it has not been recorded.
    DateTime? recordedFinishTime,

    /// Manually specified finsih time.
    /// Used in preference to the recorded finish time if specified.
    /// The manual finish time may be set to null to disable it.
    DateTime? manualFinishTime,

    /// Start time for the competitor - set based on the race at start and finish
    DateTime? startTime,
    @Default(ResultCode.notFinished) ResultCode resultCode,

    /// Number of laps - defaults to number of lap times but may be manually set
    @Default(0) int manualLaps,
    @Default([]) List<DateTime> lapTimes,
    ResultData? result,
  }) = _RaceCompetitor;

  const RaceCompetitor._();

  factory RaceCompetitor.fromJson(Map<String, Object?> json) =>
      _$RaceCompetitorFromJson(json);

  /// The number of laps, manual value if set, otherwise the number of lap times recorded.
  int get numLaps {
    if (manualLaps != 0) {
      return manualLaps;
    } else {
      // If competitor has finished then he has completed an extra lap.
      return (finishTime == null) ? lapTimes.length : lapTimes.length + 1;
    }
  }

  /// Gets the finish time using a manually entered time in preference to 
  /// a recorded one.  Returns null if no finish time is avalaible.
  DateTime? get finishTime =>
      (manualFinishTime != null) ? manualFinishTime : recordedFinishTime;

  /// Returns the total time taken (finish - start).   
  /// This is not the same as the elapsed time that is 
  Duration get totalTime => (finishTime != null && startTime != null)
      ? finishTime!.difference(startTime!)
      : const Duration();

  String get helmCrew =>
      (crew != null && crew!.trim().isNotEmpty) ? '$helm / $crew}' : helm;

  /// Competitor has finished OK
  get isOk => resultCode == ResultCode.ok;
}

/// Results data that depends on other competitors in the race.
@freezed
class ResultData with _$ResultData {
  factory ResultData({
    @Default(Duration()) Duration elapsedTime,
    @Default(Duration()) Duration correctedTime,
    required int position,
    @Default(0) double points,
    required bool isDiscarded,
    required bool isDiscardable,
  }) = _ResultData;

  const ResultData._();

  factory ResultData.fromJson(Map<String, Object?> json) =>
      _$ResultDataFromJson(json);
}
