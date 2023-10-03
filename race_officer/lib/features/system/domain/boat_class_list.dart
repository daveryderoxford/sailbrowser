
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/results/scoring/rating_system.dart';

import 'boat_class.dart';

part 'boat_class_list.freezed.dart';
part 'boat_class_list.g.dart';

/// List of boat classes with handicaps for a specific handicap scheme and year.
@freezed
class HandicapList with _$HandicapList{
  const factory HandicapList({
    required String name,
    required HandicapScheme handicapScheme,
    @Default([]) List<BoatClass> boats,
  }) = _HandicapList;

  const HandicapList._();

  factory HandicapList.fromJson(Map<String, Object?> json) =>
      _$HandicapListFromJson(json);

  BoatClass find(String className) {
     return boats.firstWhere( (boat) => boat.name == className);
  }

  static HandicapList findScheme(List<HandicapList> handicaps, HandicapScheme scheme) {
     return handicaps.firstWhere( (hcaps) => hcaps.handicapScheme == scheme);
  }

}
