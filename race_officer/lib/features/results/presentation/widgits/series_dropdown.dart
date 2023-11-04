import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/common_widgets/null_widget.dart';
import 'package:sailbrowser_flutter/features/results/domain/results_service.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/presentation/result_controller.dart';

class SeriesDropDown extends ConsumerWidget {
  const SeriesDropDown({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ref.watch(resultsService).when(
        data: (series) => DropdownMenu<SeriesResults>(
              /// must not cause rebild for initial state
              initialSelection: ref.read(resultsController).displayedSeries,
              textStyle: const TextStyle(fontSize: 15),
              label: const Text('Select Series'),
              dropdownMenuEntries: series
                  .map((s) => DropdownMenuEntry(value: s, label: s.name))
                  .toList(),
              onSelected: (SeriesResults? series) {
                if (series != null) {
                  ref.read(resultsController.notifier).displaySeries(series);
                }
              },
            ),
        error: (e, stacktrace) =>
            const Center(child: Text('Error occurred building dropdown')),
        loading: () => const NullWidget());
  }
}
