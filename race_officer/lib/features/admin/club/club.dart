
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/admin/scoring/series_scoring.dart';

import '../boat_class/boat_class.dart';
import '../fleet/fleet.dart';

part 'club.freezed.dart';
part 'club.g.dart';

enum ClubStatus {
  created,
  active,
  archived
}

@freezed
class Club with _$Club {

  const factory Club({
    required String id,
    required String name,
    required ClubStatus status,
    @Default([]) List<Fleet> fleets,
    @Default([]) List<BoatClass> boatClasses,
    required SeriesScoringData defaultScoringData,
  }) = _Club;

  const Club._();

  factory Club.fromJson(Map<String, Object?> json) => _$ClubFromJson(json);
}
