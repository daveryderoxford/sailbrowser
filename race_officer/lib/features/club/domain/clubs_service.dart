import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:loggy/loggy.dart';
import 'package:rxdart/rxdart.dart';
import 'package:sailbrowser_flutter/features/club/domain/fleet.dart';
import 'package:sailbrowser_flutter/features/results/scoring/race_scoring.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scoring.dart';
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

  Stream<List<Club>> get allClubs$ => _clubs.snapshots().map((snap) {
        final clubs = snap.docs.map<Club>((doc) => doc.data() as Club).toList();
        return clubs;
      }).shareReplay();

  Future<bool> add(Club club) async {
    try {
      final id = club.name.replaceAll(' ', '');
      final update = club.copyWith(id: id);
      await _clubs.doc(update.id).set(update);
      return true;
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e);
    }
  }

  Future<bool> update(Club club, String id) async {
    try {
      await _clubs.doc(id).update(club.toJson());
      return true;
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e); //return error
    }
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

final allClassesProvider =
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
      name: 'Portsmouth yardstick 2030',
      handicapScheme: HandicapScheme.py,
      boats: [
        BoatClass(name: 'Laser', handicap: 1024, source: BoatClassSource.club),
        BoatClass(name: 'Aero 9', handicap: 1014, source: BoatClassSource.club),
        BoatClass(name: 'Aero 7', handicap: 1065, source: BoatClassSource.club),
        BoatClass(
            name: 'ILCA 7/Laser', handicap: 1024, source: BoatClassSource.club),
        BoatClass(
            name: 'ILCA 6/Laser Radial',
            handicap: 1024,
            source: BoatClassSource.club),
      ],
    ),
  ],
  defaultScoringData: SeriesScoringData.defaultScheme,
);
