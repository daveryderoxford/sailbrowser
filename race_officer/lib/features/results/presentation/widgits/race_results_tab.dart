import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/presentation/widgits/race_results_table.dart';

import 'races_dropdown.dart';

class RaceResultsTab extends ConsumerWidget with UiLoggy {
  RaceResultsTab({required this.results, super.key});

  final RaceResults? results;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final races = (results != null) ? results!.results! : <RaceResult>[];
 
    return Column(
      children: [
        const SizedBox(height: 20),
        const RacesDropDown(),
        // const RaceChoiceChip(selected: null),
        Expanded(child: RaceResultsTable(results: races)),
      ],
    );
  }
}
