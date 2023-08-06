// GENERATED CODE - DO NOT MODIFY BY HAND

// ignore_for_file: non_constant_identifier_names

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
    );

Map<String, dynamic> _$$_ClubToJson(_$_Club instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'status': _$ClubStatusEnumMap[instance.status]!,
      'fleets': instance.fleets,
      'boatClasses': instance.boatClasses,
    };

const _$ClubStatusEnumMap = {
  ClubStatus.created: 'created',
  ClubStatus.active: 'active',
  ClubStatus.archived: 'archived',
};
