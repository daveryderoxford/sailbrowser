
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/admin/boat_class/boat_class.dart';
import 'package:sailbrowser_flutter/features/admin/scoring/race_scoring.dart';

part 'boat_class_list.freezed.dart';
part 'boat_class_list.g.dart';

/// List of boat classes with handicaps for a specific handicap scheme and year.
@freezed
class BoatClassList with _$BoatClassList {
  const factory BoatClassList({
    required String name,
    required HandicapScheme handicapScheme,
    @Default([]) List<BoatClass> boats,
  }) = _BoatClassList;

  const BoatClassList._();

  factory BoatClassList.fromJson(Map<String, Object?> json) =>
      _$BoatClassListFromJson(json);
}

