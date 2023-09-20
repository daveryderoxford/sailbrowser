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

   // boatClassHandicap( boatClasses: BoatClass[], className: string, scheme: RatingSystem ): Handicap | undefined {
  //  return boatClasses.find( c => c.name === className )?.handicaps.find( s => s.scheme === scheme);
  //}

}


