import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/app_shell/app_shell.dart';
import 'package:sailbrowser_flutter/features/results/domain/results_service.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/presentation/widgits/publish_results_dialog.dart';
import 'package:sailbrowser_flutter/features/results/presentation/widgits/series_results_tab.dart';
import 'package:sailbrowser_flutter/features/results/presentation/widgits/race_results_tab.dart';
import 'package:sailbrowser_flutter/features/results/presentation/result_controller.dart';
import 'package:sailbrowser_flutter/routing/app_router.dart';

class ResultsScreen extends ConsumerWidget with UiLoggy {
  ResultsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = ref.watch(resultsController);
    ref.watch(resultsService);

    ref.watch(resultsTabListener);

    return DefaultTabController(
      length: 2,
      initialIndex: 0,
      child: Scaffold(
        appBar: AppBar(
          actions: [
            FilledButton(
              onPressed: () async {
                if (controller.displayedSeries != null) {
                  final status = await showDialog<ResultsStatus>(
                      context: context,
                      builder: (BuildContext context) =>
                          const PublishResultsDialog());
                  ref.read(resultsController.notifier).publishResults(status!);
                }
              },
              child: const Text("Publish"),
            ),
            FilledButton(
              onPressed: () {
                context.goNamed(AppRoute.resultsSlideShow.name);
                }
                ,
              child: const Text("Slides"),
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
        body: TabBarView(
          children: [
            RaceResultsTab(results: controller.displayedRace),
            SeriesResultsTab(results: controller.displayedSeries),
          ],
        ),
      ),
    );
  }
}

/// Calculate the results when results tab is selected.
final resultsTabListener = Provider((ref) {
  ref.listen(appShellStateProvider, (oldTab, newTab) {
    if (newTab == 4) {
      ref.read(resultsController.notifier).calcResults();
    }
  });
});
