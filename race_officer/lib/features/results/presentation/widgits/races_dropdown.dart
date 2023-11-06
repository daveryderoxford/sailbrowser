import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/results_service.dart';
import 'package:sailbrowser_flutter/features/results/presentation/result_controller.dart';

class RacesDropDown extends ConsumerWidget {
  const RacesDropDown({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final races = ref.watch(raceResultsProvider);

    return DropdownMenu<RaceResults>(
      // Workaround to menu no being refreshed when item chamnge see 
      // https://github.com/flutter/flutter/issues/127568
      key: ValueKey(Object.hashAll(races)),
      // must not cause rebild for initial state 
      initialSelection: ref.read(resultsController).displayedRace,
      textStyle: const TextStyle(fontSize: 15),
     // width: 400,
      label: const Text('Select Race'),
      dropdownMenuEntries: races
          .map((race) => DropdownMenuEntry<RaceResults>(value: race, label: race.name))
          .toList(),
      onSelected: (RaceResults? race) {
        if (race != null) {
          ref.read(resultsController.notifier).displayRace(race);
        }
      },
    );
  }
}
