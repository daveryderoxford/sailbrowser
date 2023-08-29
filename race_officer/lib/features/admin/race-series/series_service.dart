
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:loggy/loggy.dart';
import 'package:rxdart/rxdart.dart';
import 'package:sailbrowser_flutter/features/admin/club/clubs_service.dart';

import 'series.dart';

class RaceSeriesService with UiLoggy {
  static final defaultDate = DateTime.fromMicrosecondsSinceEpoch(0);

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

  // Series sorter - series are sorted in order of: 
  //  * Series with no races first - null start date
  //  * In order od first race start
  //  * In otrder of the fleet id

  static int seriesSort(Series a, b) {

    if (a.startDate == null) {
      return b.startDate == null ? 1 : 0;
    }

    if (b.startDate == null) {
      return -1;
    }

    int ret = a.startDate!.compareTo(b.startDate!);
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
      .withConverter<Series>(
        fromFirestore: (snapshot, _) => Series.fromJson(snapshot.data()!),
        toFirestore: (Series series, _) => series.toJson(),
      );

  late final Stream<List<Series>> allRaceSeriess$ = _series.snapshots().map(
    (snap) {
      final series =
          snap.docs.map<Series>((doc) => doc.data() as Series).toList();
      series.sort((a, b) => seriesSort(a, b));
      return series;
    },
  ).shareReplay();

  RaceSeriesService(this.clubId);

  Future<bool> add(Series series) async {
    try {
      final updatedRaces =  _updateRaceDetails(series, [...series.races]);
      final complateUpdate = updatedRaces.copyWith(id: _series.doc().id);

      await _series.doc(complateUpdate.id).set(complateUpdate);
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
  Future<bool> update(Series series, String id) async {

    final upDatedSeries = _updateRaceDetails(series, [...series.races]);

    try {
      await _series.doc(id).update(upDatedSeries.toJson());
      return true;
    } catch (e) {
      loggy.error(e.toString());
      return Future.error(e); //return error
    }
  }

  /// Adds a new race to a series. 
  Future<bool> addRace(Series series, Race race) {
     if (race.seriesId != series.id) throw (Exception("Race seaiesId does not equal series id"));

    final races = [...series.races, race];

    final update = series.copyWith(races: races);

    return this.update(update, update.id);
  }

  /// Update a races for a series
  Future<bool> updateRace(Series series, String updatedId, Race race) {
     if (race.seriesId != series.id) throw (Exception("Race seaiesId does not equal series id"));

    final races = series.races
        .map((original) => (updatedId == original.id) ? race : original)
        .toList();

    final update = series.copyWith(races: races);

    return this.update(update, update.id);
  }

  /// Remove a race for a series
  Future<bool> removeRace(Series series, String deletedId) {
    
    final races = series.races.where((race) => race.id != deletedId).toList();

    final update = series.copyWith(races: races);

    return this.update(update, update.id);
  }

  Series _updateRaceDetails(Series series, List<Race> races) {
    // Sort Races for series into order based on start/end time
    races.sort((Race a, b) => a.scheduledStart.compareTo(b.scheduledStart));

    // Set race name based on time ordering
    final updatedRaces = races.map((race) {
      int index = races.indexOf(race);
      return race.copyWith(name: 'Race ${index.toString()}');
    }).toList();

    // Set start/end time of series
    final startDate = races.isNotEmpty ? races[0].scheduledStart : defaultDate;
    final endDate =
        races.isNotEmpty ? races[races.length - 1].scheduledStart : defaultDate;

    return series.copyWith(
        races: updatedRaces, startDate: startDate, endDate: endDate);
  }
}

final seriesRepositoryProvider = Provider(
    (ref) => RaceSeriesService(ref.watch(currentClubProvider).current!.id));

final allSeriesProvider = StreamProvider((ref) {
  final db = ref.read(seriesRepositoryProvider);
  return db.allRaceSeriess$;
});
