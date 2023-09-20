   
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/results/scoring/race_scoring.dart';

part 'fleet.freezed.dart';
part 'fleet.g.dart';

@freezed
class Fleet with _$Fleet {

  static const String unsetId = "Unset";

  const factory Fleet({
    @Default(Fleet.unsetId) String id,
    required String shortName,
    required String name,
    @Default(RatingSystem.ryaPY) handicapScheme,
    @Default("") String classFlag,
    @Default(0) int startOrder, 
  }) = _Fleet;

  const Fleet._();

  factory Fleet.fromJson(Map<String, Object?> json) => _$FleetFromJson(json);
}
