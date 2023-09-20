import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scoring.dart';
import 'package:sailbrowser_flutter/firebase/timestamp_serialiser.dart';
import 'package:uuid/uuid.dart';

part 'series.freezed.dart';
part 'series.g.dart';

@freezed
class Series with _$Series {

  factory Series.def({
    required String season,
    required String id,
    required String name,
    required String fleetId,
    @TimestampSerializer() DateTime? startDate,
    @TimestampSerializer() DateTime? endDate,
    required List<Race> races,
    required bool archived,
    required SeriesScoringData scoringScheme,
  }) = _Series;

  factory Series({
    String? season,
    required String name,
    required String fleetId,
    DateTime? startDate,
    DateTime? endDate,
    SeriesScoringData? scoringScheme,
  }) {
    return _Series(
      id: const Uuid().v1(),
      season: season ?? "",
      name: name,
      fleetId: fleetId,
      startDate: startDate,
      endDate: endDate,
      races: [],
      archived: false,
      scoringScheme:  scoringScheme ?? SeriesScoringData.defaultScheme,
    );
  }

  const Series._();

  factory Series.fromJson(Map<String, Object?> json) =>
      _$SeriesFromJson(json);
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
  factory Race.def({
    required String id,
    required String name,
    required String fleetId,
    required String seriesId,
    required DateTime scheduledStart,
    required int raceOfDay,
    required DateTime actualStart,
    required RaceType type,
    required RaceStatus status,
    required bool isDiscardable,
    required bool isAverageLap,
  }) = _Race;

  // Factory race consructor specifying defaults
  factory Race({
     String? name,
    required String fleetId,
    required String seriesId,
    required DateTime scheduledStart,
    required int raceOfDay,
    DateTime? actualStart,
    RaceType? type,
    RaceStatus? status,
    bool? isDiscardable,
    bool? isAverageLap,
  }) {
    return _Race(
      id: const Uuid().v4(),
      name: name ?? 'Unset',
      fleetId: fleetId,
      seriesId: seriesId,
      scheduledStart: scheduledStart,
      raceOfDay: raceOfDay,
      actualStart: actualStart ?? DateTime.fromMicrosecondsSinceEpoch(0),
      type: type ?? RaceType.conventional,
      status: RaceStatus.future,
      isDiscardable: isDiscardable ?? true,
      isAverageLap: isAverageLap ?? true,
    );
  }

  const Race._();

  factory Race.fromJson(Map<String, Object?> json) => _$RaceFromJson(json);
}
