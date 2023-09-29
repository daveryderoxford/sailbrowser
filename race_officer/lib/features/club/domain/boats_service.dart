import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:loggy/loggy.dart';
import 'package:rxdart/rxdart.dart';
import 'package:sailbrowser_flutter/common_widgets/snackbar_service.dart';
import 'package:sailbrowser_flutter/features/club/domain/boat.dart';
import 'package:sailbrowser_flutter/features/club/domain/clubs_service.dart';

class BoatService with UiLoggy {
  static int _boatsSort(Boat a, b) {
    final ca = a.boatClass.toLowerCase();
    final cb = b.boatClass.toLowerCase();

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

  late final Stream<List<Boat>> allBoats$ = _boatsCollection.snapshots().map(
    (snap) {
      final boats = snap.docs.map<Boat>((doc) => doc.data() as Boat).toList();
      boats.sort((a, b) => _boatsSort(a, b));
      return boats;
    },
  ).shareReplay();

  BoatService(this.clubId);

  add(Boat boat) {
    final update = boat.copyWith(id: _boatsCollection.doc().id);
    _boatsCollection
        .doc(update.id)
        .set(update)
        .onError((error, stackTrace) => _errorHandler(error, stackTrace, 'add'));
  }

  remove(String id) {
    _boatsCollection.doc(id)
    .delete()
    .onError((error, stackTrace) => _errorHandler(error, stackTrace, 'remove'));
  }

  update(Boat boat, String id) {
    _boatsCollection
        .doc(id)
        .update(boat.toJson())
        .onError((error, stackTrace) => _errorHandler(error, stackTrace, 'update'));
  }

  _errorHandler(Object? error, StackTrace stackTrace, String func) {
    final s = (error== null)  ? error.toString() : 'Error encountered BoatService.  $func';
    SnackBarService.showErrorSnackBar(content: s);
    loggy.error(s);
  }
}

final boatsProvider =
    Provider((ref) => BoatService(ref.watch(currentClubProvider).current.id));

final allBoatProvider = StreamProvider((ref) {
  final bs = ref.read(boatsProvider);
  return bs.allBoats$;
});
