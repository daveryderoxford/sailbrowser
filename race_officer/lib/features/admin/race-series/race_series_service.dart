import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:loggy/loggy.dart';
import 'package:rxdart/rxdart.dart';
import 'package:sailbrowser_flutter/features/admin/club/clubs_service.dart';

import 'race_series.dart';

class RaceSeriesService with UiLoggy {
  static final defaultDate = DateTime(1970, 0, 0);

  static int sortRaces(Race a, b) {
    int ret = a.scheduledStart.compareTo(b.scheduledStart);
    if (ret != 0) {
      return ret;
    } else {
      return (1);
      //   const index1 = this.clubQuery.fleets.findIndex(f => f.id === a.fleetId);
      //   const index2 = this.clubQuery.fleets.findIndex(f => f.id === b.fleetId);
      //   return index1 - index2;
    }
  }

  static int seriesSort(RaceSeries a, b) {
    int ret = a.startDate.compareTo(b.startDate);
    if (ret != 0) {
      return ret;
    } else {
      return (a.fleetId.compareTo(b.fleetId));
    }
  }

  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final String clubId;

  late final CollectionReference _series = _firestore
      .collection('/clubs/$clubId/series/')
      .withConverter<RaceSeries>(
        fromFirestore: (snapshot, _) => RaceSeries.fromJson(snapshot.data()!),
        toFirestore: (RaceSeries series, _) => series.toJson(),
      );

  late final Stream<List<RaceSeries>> allRaceSeriess$ = _series.snapshots().map(
    (snap) {
      final series =
          snap.docs.map<RaceSeries>((doc) => doc.data() as RaceSeries).toList();
      series.sort((a, b) => seriesSort(a, b));
      return series;
    },
  ).shareReplay();

  RaceSeriesService(this.clubId);

  Future<bool> add(RaceSeries series) async {
    try {
      final update = series.copyWith(id: _series.doc().id);
      await _series.doc(update.id).set(update);
      return true;
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e);
    }
  }

  Future<bool> remove(String id) async {
    try {
      await _series.doc(id).delete();
      return true;
    } catch (e) {
      (e.toString());
      return Future.error(e);
    }
  }

// Edit a series
  Future<bool> update(RaceSeries series, String id) async {
    try {
      await _series.doc(id).update(series.toJson());
      return true;
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e); //return error
    }
  }

  /// Adds a race to a series
  Future<bool> addRace(RaceSeries series, Race race) {
    Race updatedRace;
    if (race.id == '') {
      updatedRace =
          race.copyWith(id: UniqueKey().toString(), seriesId: series.id);
    } else {
      updatedRace = race.copyWith(seriesId: series.id);
    }

    final races = [...series.races, updatedRace];
    return _updateRaces(series, races);
  }

  /// Replaces the complete array of races
  Future<bool> addRaces(RaceSeries series, List<Race> races) {
    final update = races
        .map((race) =>
            race.copyWith(id: UniqueKey().toString(), seriesId: series.id))
        .toList();

    return _updateRaces(series, update);
  }

  /// Update a races for a series
  updateRace(RaceSeries series, String updatedId, Race race) {
    final races = series.races
        .map((original) => (updatedId == original.id) ? race : original)
        .toList();
    _updateRaces(series, races);
  }

  /// Remove a race for a series
  removeRace(RaceSeries series, String deletedId) {
    final races = series.races.where((race) => race.id != deletedId).toList();
    _updateRaces(series, races);
  }

  Future<bool> _updateRaces(RaceSeries series, List<Race> races) {
    // Sort Races for series into order based on start/end time
    races.sort((Race a, b) => a.scheduledStart.compareTo(b.scheduledStart));

    final startDate = races.isNotEmpty ? races[0].scheduledStart : defaultDate;
    final endDate =
        races.isNotEmpty ? races[races.length - 1].scheduledStart : defaultDate;

    final update =
        series.copyWith(races: races, startDate: startDate, endDate: endDate);

    return this.update(update, update.id);
  }
}

final seriesProvider = Provider(
    (ref) => RaceSeriesService(ref.watch(currentClubProvider).current!.id));
