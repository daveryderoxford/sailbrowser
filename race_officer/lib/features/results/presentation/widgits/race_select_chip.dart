import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/common_widgets/null_widget.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';

class RaceChoiceChip extends ConsumerWidget {
  const RaceChoiceChip({
    super.key,
    required this.selected,
  });

  final Race? selected;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final data = ref.watch(selectedRacesProvider);
    final races = data.map((d) => d.race).toList();

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
                      //
                    },
                  ),
                )
                .toList(),
          );
  }
}
