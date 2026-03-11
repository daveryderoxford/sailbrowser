import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:loggy/loggy.dart';
import 'package:rxdart/rxdart.dart';
import 'package:sailbrowser_flutter/common_widgets/snackbar_service.dart';
import 'package:sailbrowser_flutter/features/club/domain/fleet.dart';
import 'package:sailbrowser_flutter/features/results/scoring/rating_system.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scoring_data.dart';
import 'package:sailbrowser_flutter/features/system/domain/boat_class.dart';
import 'package:sailbrowser_flutter/features/system/domain/boat_class_list.dart';
import 'package:sailbrowser_flutter/features/system/domain/syatem_data_service.dart';
import 'club.dart';

class ClubService with UiLoggy {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  late CollectionReference _clubs;

  ClubService() {
    _clubs = _firestore.collection('/clubs').withConverter<Club>(
        fromFirestore: (snapshot, _) => Club.fromJson(snapshot.data()!),
        toFirestore: (Club club, _) => club.toJson());
  }

  add(Club club, String tenant) {
    final update = club.copyWith(id: tenant);
    _clubs
       .doc(update.id)
       .set(update)
       .onError((error, stackTrace) => _errorHandler(error, stackTrace, 'add'));
  }

  update(Club club, String id) {
    _clubs
      .doc(id)
      .update(club.toJson())
      .onError((error, stackTrace) => _errorHandler(error, stackTrace, 'update'));
  }

  _errorHandler(Object? error, StackTrace stackTrace, String func) {
    var s = 'Error encountered in club.  $func';
    s = (error == null) ? s : '$s\n${error.toString()}';
    SnackBarService.showErrorSnackBar(content: s);
    logError(s);
  }
}

class CurrentClub {
  Club current = defaultClub;

  set(Club club) {
    current = club;
  }
}

final clubProvider = Provider((ref) => ClubService());

final currentClubProvider = Provider((ref) => CurrentClub());

/// Return all boat classes for a specifed handicap scheme from both system and club.
/// Classes for the club are prefered to the system values. 
/// Classes for the club are listed first. 
final allBoatClassesProvider =
    Provider.family<List<BoatClass>, HandicapScheme>((ref, scheme) {
  final systemData = ref.watch(systemDataProvider);
  final clubData = ref.watch(currentClubProvider);

  final clubHandicaps = clubData.current.handicaps
      .firstWhere((hcaplist) => hcaplist.handicapScheme == scheme);
  final systemHandicaps = systemData.systemData.handicaps
      .firstWhere((hcaplist) => hcaplist.handicapScheme == scheme);

  List<BoatClass> combined = [
    ...clubHandicaps.boats,
    ...systemHandicaps.boats.where(
        (sys) => !clubHandicaps.boats.any((club) => sys.name == club.name))
  ];

  return combined;
});

Club defaultClub = Club(
  id: 'TestClub',
  name: 'Test Club',
  status: ClubStatus.active,
  fleets: [
    const Fleet(id: 'HCAP', shortName: 'Handicap', name: 'General handicap'),
    const Fleet(id: 'FHC', shortName: 'Fast HCap', name: 'Fast Handicap'),
    const Fleet(id: 'MHC', shortName: 'Med HCap', name: 'Medium Handicap'),
    const Fleet(id: 'SHC', shortName: 'Slow HCap', name: 'Slow Handicap'),
    const Fleet(id: 'Laser', shortName: 'Laser', name: 'Laser'),
    const Fleet(id: 'Fireball', shortName: 'Fireball', name: 'Fireball'),
  ],
  handicaps: [
    const HandicapList(
      name: 'Club PY handicaos 2030',
      handicapScheme: HandicapScheme.py,
      boats: [
        BoatClass(name: 'RS Aero 9', handicap: 1014, source: BoatClassSource.club),
        BoatClass(name: 'RS Aero 7', handicap: 1065, source: BoatClassSource.club),
        BoatClass(name: 'Local club 1', handicap: 1000, source: BoatClassSource.club),
        BoatClass(name: 'Local club 2', handicap: 1000, source: BoatClassSource.club),
      ],
    ),
  ],
  defaultScoringData: SeriesScoringData.defaultScheme,
);
