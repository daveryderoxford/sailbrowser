
import 'package:clock/clock.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/common_widgets/time_display.dart';
import 'package:sailbrowser_flutter/features/home/presentation/home_race_list_item.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series_service.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';


enum UserMenuOptions { logout, profile }

class StartScreen extends ConsumerWidget {
  const StartScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    //  final ButtonStyle textButtonStyle = TextButton.styleFrom(
    //   foregroundColor: Theme.of(context).colorScheme.onPrimary,
    //  );
    return Scaffold(
      appBar: AppBar(
          title: const Text('Start'),
      ),
      body: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _racesToday(context, ref),
        ],
      ),
    );
  }

  Map<num, List<Race>> _groupByStart(List<Race> races) {
    return races.groupBy((race) => race.raceOfDay);
  }

  Widget _racesToday(BuildContext context, WidgetRef ref) {
    final races = ref.watch(allRacesProvider);

    final now = clock.now();
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        const TimeDisplay(textScaleFactor: 1.2),
        const Text('Todays races', textScaleFactor: 1.2),
        SizedBox(
          height: 200,
          child: races.when(
              loading: () => const CircularProgressIndicator(),
              error: (error, stackTrace) => Text(error.toString()),
              data: (races) {
                final todaysRaces = races
                    .where((r) =>
                        r.scheduledStart.year == now.year &&
                        r.scheduledStart.month == now.month &&
                        r.scheduledStart.day == now.day)
                    .toList();
                if (todaysRaces.isEmpty) {
                  return const Text('No races today');
                } else {
                  return ListView.builder(
                    itemCount: todaysRaces.length,
                    itemBuilder: (context, index) =>
                        HomeRaceListItem(todaysRaces[index]),
                  );
                }
              }),
        ),
      ],
      //   ),
    );
  }
}
