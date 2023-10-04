import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/club/domain/boat.dart';
import 'package:sailbrowser_flutter/features/club/domain/boats_service.dart';

final classBoatFilter = StateProvider<String?>((ref) => null);

/// Returns a list of boats filtered by the compete class name.
/// Empty array if error occurs or none are found.
final filteredBoats = Provider<List<Boat>>((ref) {
  final boats = ref.watch(allBoatProvider).valueOrNull;
  final filter = ref.watch(classBoatFilter);

  if ((boats == null)) {
    return [];
  } else {
    return boats
        .where((boat) =>
            filter == null ||
            boat.boatClass == filter)
        .toList();
  }
});
