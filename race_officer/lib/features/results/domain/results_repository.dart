import 'package:clock/clock.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:rxdart/rxdart.dart';
import 'package:sailbrowser_flutter/features/club/domain/clubs_service.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';

class ResultsRepository {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  late final CollectionReference _resultsCollection = _firestore
      .collection('/clubs/$clubId/series/')
      .withConverter<SeriesResults>(
        fromFirestore: (snapshot, _) =>
            SeriesResults.fromJson(snapshot.data()!),
        toFirestore: (SeriesResults series, _) => series.toJson(),
      );

  late final ReplayStream<List<SeriesResults>> allSeriesResults$ =
      _resultsCollection.snapshots().map(
    (snap) {
      final series = snap.docs
          .map<SeriesResults>((doc) => doc.data() as SeriesResults)
          .toList();
      //  series.sort((a, b) => seriesSort(a, b));
      return series;
    },
  ).shareReplay();

  final String clubId;
  final List<Race> selectedRaces;
  late final List<String> seriesIds;

  ResultsRepository(this.clubId, this.selectedRaces) {
    // Compute unique series Ids for selected races.  
    // TODO - Should I load results for all series in progress.  Remove dependeny on selected races. 
    seriesIds = selectedRaces.map((race) => race.seriesId).toSet().toList();
  }

  /// Publish race results
  publish(SeriesResults seriesResults, ResultsStatus status) {
    seriesResults.publishedOn = clock.now();
    seriesResults.status = status;
    final doc =
        _firestore.doc('/clubs/$clubId/results/${seriesResults.seriesId}');
    doc.set(seriesResults.toJson());
  }
}

/// Repository of saved results for currently selected races
final resultsRepositoryProvider = Provider((ref) {
  final races =
      ref.watch(selectedRacesProvider).map((data) => data.race).toList();
  final clubId = ref.watch(currentClubProvider).current.id;
  return ResultsRepository(clubId, races);
});

