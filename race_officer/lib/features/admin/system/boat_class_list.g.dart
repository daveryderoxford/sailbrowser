// GENERATED CODE - DO NOT MODIFY BY HAND

// ignore_for_file: non_constant_identifier_names

part of 'boat_class_list.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_BoatClassList _$$_BoatClassListFromJson(Map<String, dynamic> json) =>
    _$_BoatClassList(
      name: json['name'] as String,
      handicapScheme:
          $enumDecode(_$HandicapSchemeEnumMap, json['handicapScheme']),
      boats: (json['boats'] as List<dynamic>?)
              ?.map((e) => BoatClass.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const [],
    );

Map<String, dynamic> _$$_BoatClassListToJson(_$_BoatClassList instance) =>
    <String, dynamic>{
      'name': instance.name,
      'handicapScheme': _$HandicapSchemeEnumMap[instance.handicapScheme]!,
      'boats': instance.boats,
    };

const _$HandicapSchemeEnumMap = {
  HandicapScheme.py: 'py',
  HandicapScheme.nhc: 'nhc',
  HandicapScheme.irc: 'irc',
};
