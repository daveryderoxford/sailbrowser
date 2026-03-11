import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:signals_flutter/signals_flutter.dart';
import 'package:get_it/get_it.dart';
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
  final ClubService _clubService = GetIt.I<ClubService>();

  late final CollectionReference _boatsCollection = _firestore
      .collection('/clubs/$clubId/boats')
  late final StreamSignal<List<Boat>> allBoats = streamSignal(() {
    final clubId = _clubService.currentClub().id;
    return _firestore
        .collection('/clubs/$clubId/boats')
        .withConverter<Boat>(
            fromFirestore: (snapshot, _) => Boat.fromJson(snapshot.data()!),
            toFirestore: (Boat boat, _) => boat.toJson())
        .snapshots()
        .map((snap) {
      final boats = snap.docs.map((doc) => doc.data()).toList();
      boats.sort((a, b) => _boatsSort(a, b));
      return boats;
    });
  });

  CollectionReference<Boat> get _boatsCollection => _firestore
      .collection('/clubs/${_clubService.currentClub.value.id}/boats')
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
  BoatService();

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
    var s = 'Error encountered in. $func';
    s = (error == null) ? s : '$s\n${error.toString()}';
    SnackBarService.showErrorSnackBar(content: s);
    logError(s);
  }
}

final boatsProvider =
    Provider((ref) => BoatService(ref.watch(currentClubProvider).current.id));

final allBoatProvider = StreamProvider((ref) {
  final bs = ref.watch(boatsProvider);
  return bs.allBoats$;
});
