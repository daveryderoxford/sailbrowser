   
import 'package:freezed_annotation/freezed_annotation.dart';

part 'fleet.freezed.dart';
part 'fleet.g.dart';

@freezed
class Fleet with _$Fleet {

  static const String unsetId = "Unset";

  const factory Fleet({
    @Default(Fleet.unsetId) String id,
    required String shortName,
    required String name,
   // RatingScheme handicapScheme,
   // @Default("") String classFlag
  }) = _Fleet;

  const Fleet._();

  factory Fleet.fromJson(Map<String, Object?> json) => _$FleetFromJson(json);
}
