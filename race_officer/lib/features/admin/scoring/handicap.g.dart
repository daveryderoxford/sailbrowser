// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'handicap.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Handicap _$$_HandicapFromJson(Map<String, dynamic> json) => _$_Handicap(
      scheme: $enumDecodeNullable(_$HandicapSchemeEnumMap, json['scheme']) ??
          HandicapScheme.py,
      value: json['value'] as num,
    );

Map<String, dynamic> _$$_HandicapToJson(_$_Handicap instance) =>
    <String, dynamic>{
      'scheme': _$HandicapSchemeEnumMap[instance.scheme]!,
      'value': instance.value,
    };

const _$HandicapSchemeEnumMap = {
  HandicapScheme.py: 'py',
  HandicapScheme.nhc: 'nhc',
  HandicapScheme.irc: 'irc',
};
