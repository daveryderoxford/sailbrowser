// ignore_for_file: constant_identifier_names

import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

part 'boat.freezed.dart';
part 'boat.g.dart';


enum BoatType {
  SingleHander,
  DoubleHander,
  Cat,
  DayBoat,
  Yacht,
  Windsurfer,
  Kiteboard,
  ModelYacht,
  Other
}

@freezed
class Boat with _$Boat {

  static const String UNSET_ID = "Unset";

  const factory Boat({
    @Default("UNSET_ID") String id,
    required int sailNumber,
    required String sailingClass,
    required BoatType type,
    @Default("") String  name,
    @Default("") String owner,
    @Default("") String helm,
    @Default("") String crew,
  }) = _Boat;

  const Boat._();

  factory Boat.fromJson(Map<String, Object?> json) => _$BoatFromJson(json);
}

