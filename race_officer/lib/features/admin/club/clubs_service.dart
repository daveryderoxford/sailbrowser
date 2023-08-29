import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:loggy/loggy.dart';
import 'package:rxdart/rxdart.dart';
import 'package:sailbrowser_flutter/features/admin/scoring/series_scoring.dart';
import '../boat_class/boat_class.dart';
import '../fleet/fleet.dart';
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
  Club? current = testClub;

  set(Club club) {
    current = club;
  }
}

final clubProvider = Provider((ref) => ClubService());

final currentClubProvider = Provider((ref) => CurrentClub());

Club testClub = Club(
    id: 'TestClub',
    name: 'Test Club',
    status: ClubStatus.active,
    fleets: [
       const Fleet(id: 'FHC', shortName: 'Fast HCap', name: 'Fast Handicap'),
       const Fleet( id: 'MHC', shortName: 'Med HCap', name: 'Medium Handicap' ),
       const Fleet( id: 'SHC', shortName: 'Slow HCap', name: 'Slow Handicap' ),
      const Fleet( id: 'Laser', shortName: 'Laser', name: 'Laser' ),
    ],
    boatClasses: [ 
      const BoatClass(name: 'Laser', handicap: 1024 ),
      const BoatClass(name: 'Aero 9', handicap: 1014 ),
      const BoatClass(name: 'Aero 7', handicap: 1065 ),
      const BoatClass(name: 'Laser', handicap: 1024 ),
      const BoatClass(name: 'Laser', handicap: 1024 ),
      const BoatClass(name: 'Laser', handicap: 1024 ),
    ],
    defaultScoringData: SeriesScoringData.defaultScheme,
  );
