import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/common_widgets/null_widget.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/results_service.dart';
import 'package:sailbrowser_flutter/features/results/presentation/result_controller.dart';

class RaceChoiceChip extends ConsumerWidget {
  const RaceChoiceChip({
    super.key,
    required this.selected,
  });

  final RaceResults? selected;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final races = ref.watch(raceResultsProvider);

    return races.isEmpty
        ? const NullWidget()
        : Wrap(
            spacing: 5.0,
            children: races
                .map(
                  (race) => ChoiceChip(
                    label: Text(race.name),
                    selected: (selected == race),
                    onSelected: (bool selected) {
                      selected ? ref.read(resultsController.notifier).displayRace(race) : null;
                    },
                  ),
                )
                .toList(),
          );
  }
}
