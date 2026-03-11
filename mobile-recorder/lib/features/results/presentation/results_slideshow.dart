import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/constants/app_sizes.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/results_service.dart';
import 'package:sailbrowser_flutter/features/results/presentation/result_controller.dart';
import 'package:sailbrowser_flutter/features/results/presentation/widgits/race_results_table.dart';
import 'package:visibility_detector/visibility_detector.dart';

class ResultsSlideShow extends ConsumerStatefulWidget with UiLoggy {
  const ResultsSlideShow({super.key});

  @override
  ConsumerState<ResultsSlideShow> createState() => _ResultsSlideShowState();
}

class _ResultsSlideShowState extends ConsumerState<ResultsSlideShow>
    with UiLoggy {
  int currentIndex = 0;
  int interval = 10;
  Timer? timer;
  bool isVisible = false;

  List<RaceResults> races = [];

  @override
  void initState() {
    super.initState();
    timer = Timer.periodic(Duration(seconds: interval), (Timer timer) {
      if (isVisible) {
        // Just re-calculate all results to ensure they are up-to-date.
        // Could be optimised if necessary
        ref.read(resultsController.notifier).calcAllResults();
        setState(() {
          currentIndex = (currentIndex + 1) % races.length;
        });
      }
    });
  }

  @override
  void dispose() {
    super.dispose();
    timer!.cancel();
  }

  @override
  Widget build(BuildContext context) {
    final allRaces = ref.watch(raceResultsProvider);
    races = allRaces
        .where((race) => race.results != null && race.results!.isNotEmpty)
        .toList();

    return races.isEmpty
        ? const Center(child: Text(textScaleFactor: 1.2, 'No Races to display'))
        : VisibilityDetector(
            key: const Key('resultsSlideshow'),
            onVisibilityChanged: (visibilityInfo) =>
                isVisible = visibilityInfo.visibleFraction > 0,
            child: Scaffold(
              appBar: AppBar(
                title: const Text('Results Slideshow'),
                actions: [
                  FilledButton(
                    onPressed: () async {},
                    child: const Text("Select Races"),
                  ),
                ],
              ),
              body: Column(
                children: [
                  Center(
                      child:
                          Text(textScaleFactor: 1.2, races[currentIndex].name)),
                  gapH8,
                  Expanded(
                    child:
                        RaceResultsTable(results: races[currentIndex].results!),
                  ),
                ],
              ),
            ),
          );
  }
}
