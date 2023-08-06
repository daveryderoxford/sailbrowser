// GENERATED CODE - DO NOT MODIFY BY HAND

// ignore_for_file: non_constant_identifier_names

part of 'boat.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Boat _$$_BoatFromJson(Map<String, dynamic> json) => _$_Boat(
      id: json['id'] as String? ?? Boat.UNSET_ID,
      sailNumber: json['sailNumber'] as int,
      sailingClass: json['sailingClass'] as String,
      type: $enumDecode(_$BoatTypeEnumMap, json['type']),
      name: json['name'] as String? ?? "",
      owner: json['owner'] as String? ?? "",
      helm: json['helm'] as String? ?? "",
      crew: json['crew'] as String? ?? "",
    );

Map<String, dynamic> _$$_BoatToJson(_$_Boat instance) => <String, dynamic>{
      'id': instance.id,
      'sailNumber': instance.sailNumber,
      'sailingClass': instance.sailingClass,
      'type': _$BoatTypeEnumMap[instance.type]!,
      'name': instance.name,
      'owner': instance.owner,
      'helm': instance.helm,
      'crew': instance.crew,
    };

const _$BoatTypeEnumMap = {
  BoatType.SingleHande: 'SingleHande',
  BoatType.DoubleHander: 'DoubleHander',
  BoatType.Cat: 'Cat',
  BoatType.DayBoat: 'DayBoat',
  BoatType.Yacht: 'Yacht',
  BoatType.Windsurfer: 'Windsurfer',
  BoatType.Kiteboard: 'Kiteboard',
  BoatType.ModelYacht: 'ModelYacht',
  BoatType.Other: 'Other',
};
