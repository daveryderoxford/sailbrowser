import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:loggy/loggy.dart';
import 'package:rxdart/rxdart.dart';
import 'package:sailbrowser_flutter/features/club/domain/clubs_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/main.dart';

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

  late final Stream<List<RaceCompetitor>> currectCompetitors$ = _firestore
      .collectionGroup("race_competitors")
      .where('raceId', whereIn: selectedRaces.map((race) => race.id))
      .snapshots()
      .map(
    (snap) {
      final comps =
          snap.docs.map((doc) => RaceCompetitor.fromJson(doc.data())).toList();
      return comps;
    },
  ).shareReplay();

  RaceCompetitorService(this.clubId, this.selectedRaces) {
    // compute unique series Ids for selected races
    seriesIds = selectedRaces.map((race) => race.seriesId).toSet().toList();
  }

  Future<bool> add(RaceCompetitor comp, String seriesId) async {
    try {
      await _compCollection(seriesId).doc(comp.id).set(comp);
      return true;
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e);
    }
  }

  Future<bool> remove(String id, String seriesId) async {
    try {
      await _compCollection(seriesId).doc(id).delete();
      return true;
    } catch (e) {
      (e.toString());
      return Future.error(e);
    }
  }

  Future<bool> update(RaceCompetitor comp, String id, String seriesId) async {
    try {
      await _compCollection(seriesId).doc(id).update(comp.toJson());
      return true;
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e); //return error
    }
  }

  Future<bool> saveLap(RaceCompetitor comp, String id, String seriesId) async {
    final time = getClock().now();
    final laps = [...comp.lapTimes, time];

    return await update(comp.copyWith(lapTimes: laps), id, seriesId);
  }

  Future<bool> finish(RaceCompetitor comp, String id, String seriesId) async {
    final time = getClock().now();
    final resultCode = comp.resultCode == ResultCode.notFinished
        ? ResultCode.ok
        : comp.resultCode;
    final c = comp.copyWith(finishTime: time, resultCode: resultCode);

    return await update(c, id, seriesId);
  }
}

final raceCompetitorRepositoryProvider = Provider((ref) {
  final races =
      ref.watch(selectedRacesProvider).map((data) => data.race).toList();
  final clubId = ref.watch(currentClubProvider).current.id;
  return RaceCompetitorService(clubId, races);
});

final currentCompetitors = StreamProvider(
  (ref) {
    final db = ref.watch(raceCompetitorRepositoryProvider);
    return db.currectCompetitors$;
  },
);
