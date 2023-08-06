import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/firebase/timestamp_serialiser.dart';

part 'race_series.freezed.dart';
part 'race_series.g.dart';

@freezed
class RaceSeries with _$RaceSeries {
  static const String unsetId = "Unset";

  const factory RaceSeries({
    @Default(RaceSeries.unsetId) String id,
    required String name,
    required String fleetId,
    @TimestampSerializer() required DateTime startDate,
    @TimestampSerializer() required DateTime endDate,
    @Default([]) List<Race> races,
    // scoringScheme: SeriesScoringData;
  }) = _RaceSeries;

  const RaceSeries._();

  factory RaceSeries.fromJson(Map<String, Object?> json) =>
      _$RaceSeriesFromJson(json);
}

enum RaceType {
  conventional('Conventional'),
  pursuit('Pursuit');

  final String displayName;
  const RaceType(this.displayName);
}

enum RaceStatus {
  future('Future'),
  inProgress('In progress'),
  cancelled('Canceled'),
  postponed('Postponed'),
  completed('Completed'),
  published('Published');

  final String displayName;
  const RaceStatus(this.displayName);
}

@freezed
class Race with _$Race {
  static const String unsetId = "Unset";

  const factory Race({
    @Default(RaceSeries.unsetId) String id,
    required String name,
    required String fleetId,
    required String seriesId,
    @TimestampSerializer() required DateTime scheduledStart,
    @TimestampSerializer() required DateTime actualStart,
    @Default(RaceType.conventional) RaceType type,
    @Default(RaceStatus.future) RaceStatus status,
    @Default(true) bool isDiscardable,
    @Default(true) bool isAverageLap,
    required int startNumber,
  }) = _Race;

  const Race._();

  factory Race.fromJson(Map<String, Object?> json) => _$RaceFromJson(json);
}
