import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/time_display.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';
import 'package:sailbrowser_flutter/features/race/start/domain/start_sequence.dart';
import 'package:sailbrowser_flutter/features/race/start/domain/start_sequence_service.dart';
import 'package:sailbrowser_flutter/features/race/start/presentation/start_list_item.dart';
import 'package:sailbrowser_flutter/features/race/start/presentation/start_sequence_display.dart';

typedef StartRecord = ({DateTime date, int order, List<Race> races});

class StartScreen extends ConsumerWidget with UiLoggy {
  const StartScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    //  final ButtonStyle textButtonStyle = TextButton.styleFrom(
    //   foregroundColor: Theme.of(context).colorScheme.onPrimary,
    //  );
    final startStatus =
        ref.watch(startSequenceProvider.select((value) => value.startStatus));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Start'),
      ),
      body: (startStatus == StartStatus.notConfigured)
          ? _startsList(context, ref)
          : const StartSequenceDisplay(),
    );
  }

  List<StartRecord> _groupByStart(List<Race> races) {
    final starts = <StartRecord>[];

    DateTime date = DateTime(0, 0, 0);
    int raceOfDay = 0;

    for (var race in races) {
      if (date != race.scheduledStart || raceOfDay != race.raceOfDay) {
        starts.add((
          date: race.scheduledStart,
          order: race.raceOfDay,
          races: [race],
        ));
        date = race.scheduledStart;
        raceOfDay = race.raceOfDay;
      } else {
        starts.last.races.add(race);
      }
    }
    return starts;
  }

  Widget _startsList(BuildContext context, WidgetRef ref) {
    final raceData = ref.watch(selectedRacesProvider);
    final races = raceData
        .map((r) => r.race)
        .where((r) =>
            r.status == RaceStatus.future || r.status == RaceStatus.postponed)
        .toList();

    final starts = _groupByStart(races);

    return (races.isEmpty)
        ? const Center(
            child: Text(
              textAlign: TextAlign.center,
              textScaleFactor: 1.2,
              'No races to start today.\nSelect more races on homepage if required',
            ),
          )
        : Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TimeDisplay(textScaleFactor: 1.2),
                ],
              ),
              const SizedBox(height: 15,),
              Expanded(
                child: ListView.builder(
                  itemCount: starts.length,
                  itemBuilder: (context, index) => StartListItem(starts[index]),
                ),
              ),
            ],
          );
  }
}
