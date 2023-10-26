import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';
import 'package:sailbrowser_flutter/features/results/presentation/result_controller.dart';

class RacesDropDown extends ConsumerWidget {
  const RacesDropDown({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final data = ref.watch(selectedRacesProvider);
    final races = data.map((d) => d.race).toList();

    return DropdownMenu<Race>(
      /// must not cause rebild for initial state 
      initialSelection: ref.read(resultsController).displayedRace,
      textStyle: const TextStyle(fontSize: 15),
      label: const Text('Select Race'),
      dropdownMenuEntries: races
          .map((race) => DropdownMenuEntry(value: race, label: race.name))
          .toList(),
      onSelected: (Race? race) {
        if (race != null) {
          ref.read(resultsController.notifier).displayRace(race);
        }
      },
    );
  }
}
