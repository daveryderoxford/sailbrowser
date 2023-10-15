
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/presentation/race_results_tab.dart';
import 'package:sailbrowser_flutter/features/results/presentation/result_controller.dart';
import 'package:sailbrowser_flutter/features/results/presentation/series_results_tab.dart';


class ResultsScreen extends ConsumerWidget {
    ResultsScreen({super.key});

    final seriesResults = SeriesResults(
    publishedOn: DateTime.now(), 
    status: ResultsStatus.provisional, 
    name: 'name', 
    fleet: 'fleet'
  );

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
                actions: [
            FilledButton(
              onPressed: () => ref
                  .read(resultsController.notifier)
                  .publishResults(PublishResultsOptions.selectedRace),
              child: const Text("Publish"),
            ),
          ],
            bottom: const TabBar(
              tabs: [
                Tab(text: 'Races'),
                Tab(text: 'Series'),
              ],
            ),
            title: const Text('Results'),
          ),
          body:  TabBarView(
            children: [
              RaceResultsTab(),
              SeriesResultsTab(results: seriesResults), 
            ],
          ),
        ),
      );
  }
}
