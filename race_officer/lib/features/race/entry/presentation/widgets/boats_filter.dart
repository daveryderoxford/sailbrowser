import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/club/domain/boat.dart';
import 'package:sailbrowser_flutter/features/club/domain/boats_service.dart';

final classBoatFilter = StateProvider<String?>((ref) => null);

/// Returns a list of boats filtered by class name.  
/// empty array if error occirs or none are found
final filteredBoats = Provider<List<Boat>>((ref) {
  final boats = ref.watch(allBoatProvider).valueOrNull;
  final boatClass = ref.watch(classBoatFilter);

  if ((boats == null)) {
    return [];
  } else {
    return boats
        .where((boat) =>
            boatClass == null ||
            boat.boatClass.toLowerCase().startsWith(boatClass.toLowerCase()))
        .toList();
  }
});
