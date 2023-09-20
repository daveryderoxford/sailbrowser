

import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/system/domain/boat_class_list.dart';

part 'system_data.freezed.dart';
part 'system_data.g.dart';

/// List of boat classes with handicaps for a specific handicap scheme and year.
@freezed
class SystemData with _$SystemData {
  const factory SystemData({
  @Default([]) List<HandicapList> handicaps
  }) = _SystemData;

  const SystemData._();

  factory SystemData.fromJson(Map<String, Object?> json) =>
      _$SystemDataFromJson(json);

}
