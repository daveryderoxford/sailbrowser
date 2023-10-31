import 'package:clock/clock.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:loggy/loggy.dart';
import 'package:rxdart/rxdart.dart';
import 'package:sailbrowser_flutter/common_widgets/snackbar_service.dart';
import 'package:sailbrowser_flutter/features/club/domain/clubs_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';

/// Competitors for selected races
class RaceCompetitorService with UiLoggy {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  final String clubId;
  final List<Race> selectedRaces;
  late final List<String> seriesIds;

  CollectionReference _compCollection(String seriesId) {
    return _firestore
        .collection('/clubs/$clubId/series/$seriesId/race_competitors')
        .withConverter<RaceCompetitor>(
          fromFirestore: (snapshot, _) =>
              RaceCompetitor.fromJson(snapshot.data()!),
          toFirestore: (RaceCompetitor competitor, _) => competitor.toJson(),
        );
  }

  late final ReplayStream<List<RaceCompetitor>> currectCompetitors$ = _firestore
      .collectionGroup("race_competitors")
      .where('raceId', whereIn: selectedRaces.map((race) => race.id))
      .snapshots()
      .map(
    (snap) {
      final comps =
          snap.docs.map((doc) => RaceCompetitor.fromJson(doc.data())).toList();
    //  final changes = snap.docChanges.map<RaceCompetitor>((change) => change.doc.data() as RaceCompetitor).toList();
     // _changes$.add(changes);
      return comps;
    },
  ).shareReplay();

  final _changes$ = BehaviorSubject<List<RaceCompetitor>>.seeded([]);
  /// Stream of changes to currect competitors.  May be used to invalidate 
  get changes$ => _changes$.stream;

  RaceCompetitorService(this.clubId, this.selectedRaces) {
    // compute unique series Ids for selected races
    seriesIds = selectedRaces.map((race) => race.seriesId).toSet().toList();
  }

  add(RaceCompetitor comp, String seriesId) {
    _compCollection(seriesId)
      .doc(comp.id)
      .set(comp)
      .onError((error, stackTrace) => _errorHandler(error, stackTrace, 'add'));
  }

  remove(String id, String seriesId)  {
    _compCollection(seriesId)
      .doc(id)
      .delete()
      .onError((error, stackTrace) => _errorHandler(error, stackTrace, 'remove'));
  }

  update(RaceCompetitor comp, String id, String seriesId) async {
      _compCollection(seriesId)
           .doc(id)
           .update(comp.toJson())
           .onError((error, stackTrace) => _errorHandler(error, stackTrace, 'update'));
  }

  saveLap(RaceCompetitor comp, String id, String seriesId) {
    final time = clock.now();
    final laps = [...comp.lapTimes, time];

    update(comp.copyWith(lapTimes: laps), id, seriesId);
  }

  finish(RaceCompetitor comp, String id, String seriesId) {
    final time = clock.now();
    final resultCode = comp.resultCode == ResultCode.notFinished
        ? ResultCode.ok
        : comp.resultCode;

    final race = selectedRaces.firstWhere((race) => race.id == comp.raceId);

    final c = comp.copyWith(
        recordedFinishTime: time, startTime: race.actualStart, resultCode: resultCode);

    update(c, id, seriesId);
  }

  _errorHandler(Object? error, StackTrace stackTrace, String func) {
    final s =
        (error == null) ? error.toString() : 'Error encountered Race Competitor.  $func';
    SnackBarService.showErrorSnackBar(content: s);
    loggy.error(s);
  }
}

final raceCompetitorRepositoryProvider = Provider((ref) {
  final races =
      ref.watch(selectedRacesProvider).map((data) => data.race).toList();
  final clubId = ref.watch(currentClubProvider).current.id;
  return RaceCompetitorService(clubId, races);
});

final currentCompetitors = StreamProvider<List<RaceCompetitor>>(
  (ref) {
    final db = ref.watch(raceCompetitorRepositoryProvider);
    return db.currectCompetitors$;
  },
);

final changedCompetitors = StreamProvider<List<RaceCompetitor>>(
  (ref) {
    final db = ref.watch(raceCompetitorRepositoryProvider);
    return db.changes$;
  },
);

