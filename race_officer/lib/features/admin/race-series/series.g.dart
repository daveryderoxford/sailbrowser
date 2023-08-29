// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'series.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Series _$$_SeriesFromJson(Map<String, dynamic> json) => _$_Series(
      season: json['season'] as String,
      id: json['id'] as String,
      name: json['name'] as String,
      fleetId: json['fleetId'] as String,
      startDate: const TimestampSerializer().fromJson(json['startDate']),
      endDate: const TimestampSerializer().fromJson(json['endDate']),
      races: (json['races'] as List<dynamic>)
          .map((e) => Race.fromJson(e as Map<String, dynamic>))
          .toList(),
      archived: json['archived'] as bool,
      scoringScheme: SeriesScoringData.fromJson(
          json['scoringScheme'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$$_SeriesToJson(_$_Series instance) => <String, dynamic>{
      'season': instance.season,
      'id': instance.id,
      'name': instance.name,
      'fleetId': instance.fleetId,
      'startDate': _$JsonConverterToJson<dynamic, DateTime>(
          instance.startDate, const TimestampSerializer().toJson),
      'endDate': _$JsonConverterToJson<dynamic, DateTime>(
          instance.endDate, const TimestampSerializer().toJson),
      'races': instance.races.map((e) => e.toJson()).toList(),
      'archived': instance.archived,
      'scoringScheme': instance.scoringScheme.toJson(),
    };

Json? _$JsonConverterToJson<Json, Value>(
  Value? value,
  Json? Function(Value value) toJson,
) =>
    value == null ? null : toJson(value);

_$_Race _$$_RaceFromJson(Map<String, dynamic> json) => _$_Race(
      id: json['id'] as String,
      name: json['name'] as String,
      fleetId: json['fleetId'] as String,
      seriesId: json['seriesId'] as String,
      scheduledStart: DateTime.parse(json['scheduledStart'] as String),
      actualStart: DateTime.parse(json['actualStart'] as String),
      type: $enumDecode(_$RaceTypeEnumMap, json['type']),
      status: $enumDecode(_$RaceStatusEnumMap, json['status']),
      isDiscardable: json['isDiscardable'] as bool,
      isAverageLap: json['isAverageLap'] as bool,
      backtoBackNumber: json['backtoBackNumber'] as int,
    );

Map<String, dynamic> _$$_RaceToJson(_$_Race instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'fleetId': instance.fleetId,
      'seriesId': instance.seriesId,
      'scheduledStart': instance.scheduledStart.toIso8601String(),
      'actualStart': instance.actualStart.toIso8601String(),
      'type': _$RaceTypeEnumMap[instance.type]!,
      'status': _$RaceStatusEnumMap[instance.status]!,
      'isDiscardable': instance.isDiscardable,
      'isAverageLap': instance.isAverageLap,
      'backtoBackNumber': instance.backtoBackNumber,
    };

const _$RaceTypeEnumMap = {
  RaceType.conventional: 'conventional',
  RaceType.pursuit: 'pursuit',
};

const _$RaceStatusEnumMap = {
  RaceStatus.future: 'future',
  RaceStatus.inProgress: 'inProgress',
  RaceStatus.cancelled: 'cancelled',
  RaceStatus.postponed: 'postponed',
  RaceStatus.completed: 'completed',
  RaceStatus.published: 'published',
};
