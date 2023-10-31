import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/features/results/presentation/widgits/series_results_tab.dart';
import 'package:sailbrowser_flutter/features/results/presentation/widgits/race_results_tab.dart';
import 'package:sailbrowser_flutter/features/results/presentation/result_controller.dart';

class ResultsScreen extends ConsumerWidget with UiLoggy {
  ResultsScreen({super.key});

 /* static const numCompetitors = 30;
  static const numRaces = 10;

  final r = SeriesResults(
    season: 'Season',
    publishedOn: DateTime.now(),
    status: ResultsStatus.provisional,
    name: 'Summer Fast Handicap',
    fleetId: 'FHC',
    seriesId: 'Unset',
    endDate: DateTime(2023, 12, 14),
    scoringScheme: SeriesScoringData.defaultScheme,
    startDate: DateTime(2023, 9, 9),
    races: List<RaceResults>.generate(
      numRaces,
      (index) => RaceResults(
        publishedOn: DateTime.now(),
        status: ResultsStatus.provisional,
        name: 'name',
        date: DateTime(2023, 5, 21),
        fleet: 'Fleet name',
        raceId: 'Unset',
        index: index,
        results: List<RaceResult>.generate(
          numCompetitors,
          (index) => RaceResult(
            helm: 'Dave Ryder',
            crew: ' Michelle Ryder',
            boatClass: 'RS400',
            sailNumber: 1544,
            position: (index + 1).toString(),
            points: index + 1,
            resultCode: ResultCode.ok,
            elapsed: const Duration(minutes: 45, seconds: 15),
            corrected: const Duration(minutes: 48, seconds: 21),
          ),
        ),
      ),
    ),
    competitors: List<SeriesCompetitor>.generate(
      numCompetitors,
      (index) => SeriesCompetitor(
        helm: 'Dave Ryder',
        crew: 'Michelle Ryder',
        boatClass: 'RS400',
        sailNumber: 1445,
        name: 'The Dark Destriyer',
        totalPoints: 100.5,
        netPoints: 50.5,
        position: index + 1,
        handicap: 1000.0,
        results: List<SeriesResultData>.generate(
          numRaces,
          (raceIndex) => (
            points: 1.0,
            resultCode: ResultCode.dns,
            isDiscard: true,
          ),
        ),
      ),
    ),
  ); */

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = ref.watch(resultsController);

    return DefaultTabController(
      length: 2,
      initialIndex: 0,
      child: Scaffold(
        appBar: AppBar(
          actions: [
            FilledButton(
              onPressed: () {},
              /* => ref
                  .read(resultsController.notifier)
                  .publishResults(PublishResultsOptions.selectedRace), */
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
            RaceResultsTab(results: controller.displayedRace),
            SeriesResultsTab(results: controller.displayedSeries),
          ],
        ),
      ),
    );
  }
}
