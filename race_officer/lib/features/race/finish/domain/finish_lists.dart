import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

/// Competitors actively racing.
/// Takes parameter if finished or unfnished baots should be returned.
/// Based on:
/// * races is in progress and
/// * the competitor has not finihed,
final racingCompetitorsProvider =
    Provider.family<List<RaceCompetitor>, bool>((ref, bool racing) {
  final competitors = ref.watch(currentCompetitors).valueOrNull;
  if (competitors == null) return [];

  final raceData = ref.watch(selectedRacesProvider);

  final raceIds = raceData
      .where((data) => data.race.status == RaceStatus.inProgress)
      .map((data) => data.race.id);

  if (racing) {
    return competitors
        .where((comp) =>
            comp.resultCode == ResultCode.notFinished &&
            raceIds.contains(comp.raceId))
        .toList();
  } else {
    return competitors
        .where((comp) =>
            comp.resultCode != ResultCode.notFinished &&
            raceIds.contains(comp.raceId))
        .toList();
  }
});

// Competitors approaching the finish - selected by the race officer
class PinnedCompetitors extends StateNotifier<Iterable<String>> {
  List<RaceCompetitor> competitors;

  PinnedCompetitors(this.competitors) : super([]);

  void addId(String compId) {
    state = [...state, compId].unique((id) => id);
  }

  void removeId(String compId) {
    state = state.where((id) => compId != id).toList();
  }
}

final pinnedCompetitorsProvider = StateNotifierProvider(
  (ref) => PinnedCompetitors(ref.watch(racingCompetitorsProvider(true))),
);
