
import 'package:flutter/material.dart';
import 'package:sailbrowser_flutter/features/results/presentation/race_results_tab.dart';


class ResultsScreen extends StatelessWidget {
  const ResultsScreen({super.key});

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
          body: const TabBarView(
            children: [
              RaceResultsTab(),
              RaceResultsTab(), //TODO 
            ],
          ),
        ),
      );
  }
}
