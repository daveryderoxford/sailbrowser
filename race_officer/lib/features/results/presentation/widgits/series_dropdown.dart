import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';
import 'package:sailbrowser_flutter/features/results/presentation/result_controller.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

class SeriesDropDown extends ConsumerWidget {
  const SeriesDropDown({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final data = ref.watch(selectedRacesProvider);
    final series = data.map((d) => d.series).toList().unique().toList();

    return DropdownMenu<Series>(
      /// must not cause rebild for initial state 
      initialSelection: ref.read(resultsController).series,
      textStyle: const TextStyle(fontSize: 15),
      label: const Text('Select Race'),
      dropdownMenuEntries: series
          .map((series) => DropdownMenuEntry(value: series, label: series.name))
          .toList(),
      onSelected: (Series? series) {
        if (series != null) {
          ref.read(resultsController.notifier).displaySeries(series);
        }
      },
    );
  }
}
