import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series_service.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

/// Races selected by the Race officer to be run during the day
class SelectedRaceIds extends StateNotifier<Iterable<String>> {
  SelectedRaceIds() : super([]);

  void addRace(List<String> ids) {
    state = [...state, ...ids].unique((id) => id);
  }

  void removeRace(String removedId) {
    state = state.where((id) => removedId != id).toList();
  }
}

final selectedRaceIdsProvider =
    StateNotifierProvider<SelectedRaceIds, Iterable<String>>(
  (ref) {
    return SelectedRaceIds();
  },
);

/// Derived provider for the currectly selected races
final selectedRacesProvider = Provider<List<AllRaceData>>((ref) {
  final selectedIDs = ref.watch(selectedRaceIdsProvider);
  final races = ref.watch(allRaceDataProvider);

  return races.map<List<AllRaceData>>(
      data: (data) =>
          data.value.where((d) => selectedIDs.contains(d.race.id)).toList(),
      error: (error) => [],
      loading: (loading) => []);
});
