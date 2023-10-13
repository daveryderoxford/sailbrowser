import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/presentation/widgits/race_results_table.dart';

class RaceResultsTab extends ConsumerWidget with UiLoggy {
  RaceResultsTab({super.key});

  final results = List<RaceResult>.generate(
      15,
      (index) => RaceResult(
            helm: 'Dave Ryder',
            crew: ' Michelle Ryder',
            boatClass: 'RS400',
            sailNumber: 1544,
            position: (index+1).toString(),
            points: index+1,
            resultCode: ResultCode.ok,
            elapsed: const Duration(minutes: 45, seconds: 15),
            corrected: const Duration(minutes: 48, seconds: 21),
          ));

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Column(
      children: [
        //  const RaceChoiceChip(selected: null),
        Expanded(child: RaceResultsTable(results: results)),
      ],
    );
  }
}
