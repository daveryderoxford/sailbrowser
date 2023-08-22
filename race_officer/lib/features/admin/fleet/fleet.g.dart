// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'fleet.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Fleet _$$_FleetFromJson(Map<String, dynamic> json) => _$_Fleet(
      id: json['id'] as String? ?? Fleet.unsetId,
      shortName: json['shortName'] as String,
      name: json['name'] as String,
      handicapScheme: json['handicapScheme'] ?? HandicapScheme.py,
      classFlag: json['classFlag'] as String? ?? "",
    );

Map<String, dynamic> _$$_FleetToJson(_$_Fleet instance) => <String, dynamic>{
      'id': instance.id,
      'shortName': instance.shortName,
      'name': instance.name,
      'handicapScheme': instance.handicapScheme,
      'classFlag': instance.classFlag,
    };
