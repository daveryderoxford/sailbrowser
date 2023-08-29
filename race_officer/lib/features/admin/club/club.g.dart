// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'club.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Club _$$_ClubFromJson(Map<String, dynamic> json) => _$_Club(
      id: json['id'] as String,
      name: json['name'] as String,
      status: $enumDecode(_$ClubStatusEnumMap, json['status']),
      fleets: (json['fleets'] as List<dynamic>?)
              ?.map((e) => Fleet.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
      boatClasses: (json['boatClasses'] as List<dynamic>?)
              ?.map((e) => BoatClass.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
      defaultScoringData: SeriesScoringData.fromJson(
          json['defaultScoringData'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$$_ClubToJson(_$_Club instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'status': _$ClubStatusEnumMap[instance.status]!,
      'fleets': instance.fleets.map((e) => e.toJson()).toList(),
      'boatClasses': instance.boatClasses.map((e) => e.toJson()).toList(),
      'defaultScoringData': instance.defaultScoringData.toJson(),
    };

const _$ClubStatusEnumMap = {
  ClubStatus.created: 'created',
  ClubStatus.active: 'active',
  ClubStatus.archived: 'archived',
};
