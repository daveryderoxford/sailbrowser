import 'package:freezed_annotation/freezed_annotation.dart';

part 'boat_class.freezed.dart';
part 'boat_class.g.dart';

enum BoatClassSource {
  standard, 
  club,
  other,
}

@freezed
class BoatClass  with _$BoatClass {
  const factory BoatClass({
   required String name,
   required num handicap,
   required BoatClassSource source,
  }) = _BoatClass;
 
  const BoatClass._();

  factory BoatClass.fromJson(Map<String, Object?> json) => _$BoatClassFromJson(json);

  /// Alternate names for boat classes.
  /// Alternate names are separated by a '/' chararacter. 
  List<String> get alternateNames => name.split('/');

}

/// Static functions related to boat class name
class BoatClassName {
  static List<String> alternateNames(String name) => name.split('/');

  static bool startsWith(String name, String test) => 
    alternateNames(name).any((n) => _strip(n).startsWith(_strip(test)));

  static String _strip(n) => n.toLowerCase().replaceAll(' ', '');

}

