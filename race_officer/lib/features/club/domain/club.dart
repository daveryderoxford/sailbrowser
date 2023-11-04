
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:sailbrowser_flutter/features/club/domain/fleet.dart';
import 'package:sailbrowser_flutter/features/race/start/domain/start_flag_sequence.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scoring_data.dart';

import 'package:sailbrowser_flutter/features/system/domain/boat_class_list.dart';

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
    @Default("") contactEmail,
    @Default([]) List<Fleet> fleets,
    @Default([]) List<HandicapList> handicaps,
    required SeriesScoringData defaultScoringData,
    @Default(StartFlagSequence()) startFlagSequence,
  }) = _Club;

  const Club._();

  factory Club.fromJson(Map<String, Object?> json) => _$ClubFromJson(json);
}
