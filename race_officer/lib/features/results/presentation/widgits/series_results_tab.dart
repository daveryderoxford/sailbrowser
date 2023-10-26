import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/presentation/widgits/series_results_table.dart';

import 'series_dropdown.dart';


class SeriesResultsTab extends ConsumerWidget with UiLoggy {
  SeriesResultsTab({required this.results, super.key});

  final SeriesResults results;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Column(
      children: [
        const SizedBox(height: 20),
        const SeriesDropDown(),
        Expanded(child: SeriesResultsTable(results: results)),
      ],
    );
  }
}
