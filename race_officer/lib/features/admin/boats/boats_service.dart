import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:loggy/loggy.dart';
import 'package:rxdart/rxdart.dart';
import '../../../models/boat.dart';

int boatsSort(Boat a, b) {
  final ca = a.sailingClass.toLowerCase();
  final cb = b.sailingClass.toLowerCase();

  if (ca != cb) {
    return ca.compareTo(cb);
  } else {
    return a.sailNumber < b.sailNumber ? -1 : 1;
  }
}

class BoatService with UiLoggy {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  late CollectionReference _boats;

  BoatService() {
    _boats = _firestore.collection('/clubs/TestClub/boats').withConverter<Boat>(
        fromFirestore: (snapshot, _) => Boat.fromJson(snapshot.data()!),
        toFirestore: (Boat boat, _) => boat.toJson());
  }

  Stream<List<Boat>> get allBoats$ => _boats.snapshots().map((snap) {
        final boats = snap.docs.map<Boat>((doc) => doc.data() as Boat).toList();
        boats.sort((a, b) => boatsSort(a, b));
        return boats;
      }).shareReplay();

  // Add a boat
  //  return true if its successful.
  Future<bool> add(Boat boat) async {
    try {
      final update = boat.copyWith(id: _boats.doc().id);
      await _boats.doc(boat.id).set(update);
      return true;
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e);
    }
  }

  // Remove a boat
  Future<bool> remove(String id) async {
    try {
      await _boats.doc(id).delete();
      return true;
    } catch (e) {
      
      (e.toString());
      return Future.error(e);
    }
  }

// Edit a boat
  Future<bool> update(Boat boat, String id) async {
    try {
      await _boats.doc(id).update(boat.toJson());
      return true; 
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e); //return error
    }
  }
}

final boatsProvider = Provider((ref) => BoatService());
