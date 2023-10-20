import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'widgits/series_dropdown.dart';
import 'widgits/series_results_table.dart';

class SeriesResultsTab extends ConsumerWidget with UiLoggy {
  SeriesResultsTab({required this.results, super.key});

  final SeriesResults results;

  final r = SeriesResults(
    publishedOn: DateTime.now(),
    status: ResultsStatus.provisional,
    name: 'Summer Fast Handicap',
    fleet: 'FHC',
    races: List<RaceResults>.generate(
        10,
        (index) => RaceResults(
            publishedOn: DateTime.now(),
            status: ResultsStatus.provisional,
            name: 'name',
            date: DateTime(2023, 5, 21),
            fleet: 'Fleet name',
            index: index)),
    competitors: List.generate(
      30,
      (index) => (
        helm: 'Dave Ryder',
        crew: 'Michelle Ryder',
        boatClass: 'RS400',
        sailNumber: 1445,
        name: 'The Dark Destriyer',
        totalPoints: 100.5,
        netPoints: 50.5,
        position: index+1,
        handicap: 1000.0,
      ),
    ),
    results: List.generate(
      30,
      (compIndex) => List.generate(
        10,
        (raceIndex) => (
          points: 1.0,
          resultCode: ResultCode.dns,
          isDiscard: true,
        ),
      ),
    ),
  );

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Column(
      children: [
        const SizedBox(height: 20),
        const SeriesDropDown(),
        Expanded(child: SeriesResultsTable(results: r)),
      ],
    );
  }
}
