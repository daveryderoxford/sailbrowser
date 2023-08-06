import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/admin/club/clubs_service.dart';
import 'package:sailbrowser_flutter/features/admin/fleet/fleet.dart';

import '../race_series.dart';

class RaceSeriesDetailScreen extends ConsumerWidget {
  final RaceSeries series;

  const RaceSeriesDetailScreen(this.series, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final club = ref.read(currentClubProvider).current;
    // final database = ref.watch(seriesProvider);
    return Scaffold(
      appBar: AppBar(title: const Text('Series Detail'), actions: [
        IconButton(
          onPressed: () => {debugPrint('Display copy screen')},
          icon: const Icon(Icons.copy_all_outlined),
          tooltip: 'Copy Series',
        ),
        IconButton(
          onPressed: () => {debugPrint('Delete Series')},
          icon: const Icon(Icons.remove_circle_outline),
          tooltip: 'Delete Series',
        ),
      ]),
      body: Column(
        children: [
          _seriesCard(context, club!.fleets),
          _racesCard(context),
        ],
      ),
    );
  }

  Widget _seriesCard(BuildContext context, List<Fleet> fleets) {
    final fleetName = fleets.firstWhere((f) => f.id == series.fleetId).name;
    return Card(
      color: Theme.of(context).colorScheme.surfaceVariant,
      child: Container(
        padding: const EdgeInsets.all(16.0),
        alignment: Alignment.centerLeft,
        child: Row(
          children: [
            Text(fleetName),
            const SizedBox(width: 35),
            Text(series.name),
            const Spacer(),
            IconButton(
              onPressed: () => {debugPrint('Display edit screen screen')},
              icon: const Icon(Icons.edit_attributes_outlined),
            ),
          ],
        ),
      ),
    );
  }

  Widget _racesList(List<Race> races) {

      

      return ListView.separated(
        itemCount: races.length,
        separatorBuilder: (BuildContext context, int index) => const Divider(),
        itemBuilder: (BuildContext context, int index) {

        final race = races[index];
        final avgLap = race.isAverageLap ? 'Average lap' : '';
     //   final date = race.scheduledStart;
     //   final startTime = race.scheduledStart;
        final status = 'Status: ${race.status.name}';
        final type = race.type.name;

        return ListTile(
            title: Row(
              children: [
              Text(race.name),
               const Text('Scheduled start:'),
               Text(type),
               Text(status),
            ],
            ),
            subtitle: Text(avgLap),
            trailing: IconButton(
              onPressed: () => {debugPrint('Display race edit screen screen')},
              icon: const Icon(Icons.edit_attributes_outlined),
            ),
        );
        }    
      );
  }

  Widget _racesCard(BuildContext context) {
    return Card(
      child: Column(
        children: [
          Row(
            children: [
              const Text('Races'),
              const Spacer(),
              OutlinedButton(
                onPressed: () {
                  // TODO
                  debugPrint('Display add race screen');
                },
                child: const Text('Add'),
              ),
            ],
          ),
          if (series.races.isEmpty) ...[
            const Center(child: Text('No races to display')),
          ] else ...[
            _racesList(series.races),
          ],
        ],
      ),
    );
  }
}
