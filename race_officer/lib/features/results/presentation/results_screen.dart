
import 'package:flutter/material.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/presentation/race_results_tab.dart';
import 'package:sailbrowser_flutter/features/results/presentation/series_results_tab.dart';


class ResultsScreen extends StatelessWidget {
    ResultsScreen({super.key});

    final seriesResults = SeriesResults(
    publishedOn: DateTime.now(), 
    status: ResultsStatus.provisional, 
    name: 'name', 
    fleet: 'fleet'
  );

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
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
