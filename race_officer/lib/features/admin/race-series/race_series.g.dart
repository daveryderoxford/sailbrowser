// GENERATED CODE - DO NOT MODIFY BY HAND

// ignore_for_file: non_constant_identifier_names

part of 'race_series.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_RaceSeries _$$_RaceSeriesFromJson(Map<String, dynamic> json) =>
    _$_RaceSeries(
      id: json['id'] as String? ?? RaceSeries.unsetId,
      name: json['name'] as String,
      fleetId: json['fleetId'] as String,
      startDate: const TimestampSerializer().fromJson(json['startDate']),
      endDate: const TimestampSerializer().fromJson(json['endDate']),
      races: (json['races'] as List<dynamic>?)
              ?.map((e) => Race.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
    );

Map<String, dynamic> _$$_RaceSeriesToJson(_$_RaceSeries instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'fleetId': instance.fleetId,
      'startDate': const TimestampSerializer().toJson(instance.startDate),
      'endDate': const TimestampSerializer().toJson(instance.endDate),
      'races': instance.races,
    };

_$_Race _$$_RaceFromJson(Map<String, dynamic> json) => _$_Race(
      id: json['id'] as String? ?? RaceSeries.unsetId,
      name: json['name'] as String,
      fleetId: json['fleetId'] as String,
      seriesId: json['seriesId'] as String,
      scheduledStart:
          const TimestampSerializer().fromJson(json['scheduledStart']),
      actualStart: const TimestampSerializer().fromJson(json['actualStart']),
      type: $enumDecodeNullable(_$RaceTypeEnumMap, json['type']) ??
          RaceType.conventional,
      status: $enumDecodeNullable(_$RaceStatusEnumMap, json['status']) ??
          RaceStatus.future,
      isDiscardable: json['isDiscardable'] as bool? ?? true,
      isAverageLap: json['isAverageLap'] as bool? ?? true,
      startNumber: json['startNumber'] as int,
    );

Map<String, dynamic> _$$_RaceToJson(_$_Race instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'fleetId': instance.fleetId,
      'seriesId': instance.seriesId,
      'scheduledStart':
          const TimestampSerializer().toJson(instance.scheduledStart),
      'actualStart': const TimestampSerializer().toJson(instance.actualStart),
      'type': _$RaceTypeEnumMap[instance.type]!,
      'status': _$RaceStatusEnumMap[instance.status]!,
      'isDiscardable': instance.isDiscardable,
      'isAverageLap': instance.isAverageLap,
      'startNumber': instance.startNumber,
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
