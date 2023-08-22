import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:loggy/loggy.dart';
import 'package:rxdart/rxdart.dart';
import 'package:sailbrowser_flutter/features/admin/club/clubs_service.dart';
import 'package:sailbrowser_flutter/models/boat.dart';

class BoatService with UiLoggy {
  static int _boatsSort(Boat a, b) {
    final ca = a.sailingClass.toLowerCase();
    final cb = b.sailingClass.toLowerCase();

    if (ca != cb) {
      return ca.compareTo(cb);
    } else {
      return a.sailNumber < b.sailNumber ? -1 : 1;
    }
  }

  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final String clubId;

  late final CollectionReference _boatsCollection = _firestore
      .collection('/clubs/$clubId/boats')
      .withConverter<Boat>(
          fromFirestore: (snapshot, _) => Boat.fromJson(snapshot.data()!),
          toFirestore: (Boat boat, _) => boat.toJson());

  late final Stream<List<Boat>> allBoats$ = _boatsCollection.snapshots()
  .map(
    (snap) {
      loggy.info('snapshot size: smap ${snap.size}   Number of changes ${snap.docChanges.length}');
      final boats = snap.docs.map<Boat>((doc) => doc.data() as Boat).toList();
      boats.sort((a, b) => _boatsSort(a, b));
      loggy.info('Boats updateed}');
      return boats;
    },
  ).shareReplay();

  BoatService(this.clubId) {
     loggy.info('Creating Boat service');
  }

  Future<bool> add(Boat boat) async {
    try {
      final update = boat.copyWith(id: _boatsCollection.doc().id);
      await _boatsCollection.doc(update.id).set(update);
      return true;
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e);
    }
  }

  Future<bool> remove(String id) async {
    try {
      await _boatsCollection.doc(id).delete();
      return true;
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e);
    }
  }

  Future<bool> update(Boat boat, String id) async {
    try {
      await _boatsCollection.doc(id).update(boat.toJson());
      return true;
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e);
    }
  }
}

final boatsProvider =
    Provider((ref) => BoatService(ref.watch(currentClubProvider).current!.id));

final allBoatProvider =
    StreamProvider( (ref)  {
      final bs = ref.read(boatsProvider);
      return bs.allBoats$;
    });

