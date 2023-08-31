import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:sailbrowser_flutter/common_widgets/delete_button.dart';
import 'package:sailbrowser_flutter/features/admin/club/clubs_service.dart';
import 'package:sailbrowser_flutter/features/admin/fleet/fleet.dart';
import 'package:sailbrowser_flutter/features/admin/race-calander/presentation/copy_series.dart';
import 'package:sailbrowser_flutter/features/admin/race-calander/presentation/race_edit.dart';
import 'package:sailbrowser_flutter/features/admin/race-calander/presentation/series_edit.dart';

import '../series.dart';
import '../series_service.dart';

class SeriesDetailScreen extends ConsumerWidget {
  final String seriesId;
  late Series series;

  SeriesDetailScreen(this.seriesId, {super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final club = ref.read(currentClubProvider).current;

    final allSeries = ref.watch(allSeriesProvider);

    allSeries.when(
        data: (allSeries) =>
            series = allSeries.firstWhere((s) => s.id == seriesId),
        error: (obj, stack) {
          return const Center(child: Text('Some error occurred'));
        },
        loading: () => const Center(child: CircularProgressIndicator()));

    return Scaffold(
      appBar: AppBar(title: const Text('Series Detail'), actions: [
        IconButton(
          onPressed: () => {
            Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => CopySeries(series: series),
                ),
              )
          },
          icon: const Icon(Icons.copy_all_outlined),
          tooltip: 'Copy Series',
        ),
      ]),
      body: Column(
        children: [
          _seriesCard(context, club!.fleets),
          _racesHeader(context),
          _racesList(series.races),
          DeleteButton(
              title: 'Delete Series',
              itemName: 'series',
              visible: true,
              onDelete: () {
                final raceSeriesService = ref.read(seriesRepositoryProvider);
                raceSeriesService.remove(series.id);
                context.pop();
              }),
        ],
      ),
    );
  }

  Widget _seriesCard(BuildContext context, List<Fleet> fleets) {
    final fleetName = fleets.firstWhere((f) => f.id == series.fleetId).name;
    final dateFmt = DateFormat('dd MMM yyyy').format;
    final seriesDuration = series.races.isNotEmpty
        ? '${dateFmt(series.startDate!)} to ${dateFmt(series.endDate!)}'
        : "";

    return Card(
      color: Theme.of(context).colorScheme.surfaceVariant,
      child: Container(
        padding: const EdgeInsets.all(8.0),
        alignment: Alignment.centerLeft,
        child: ListTile(
          title: Row(children: [
            Text(fleetName),
            const SizedBox(width: 20),
            Text(series.name),
          ]),
          subtitle: Text(seriesDuration),
          trailing: IconButton(
            onPressed: () => {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) =>
                      EditSeries(series: series, id: series.id),
                ),
              )
            },
            icon: const Icon(Icons.edit),
          ),
        ),
      ),
    );
  }

  Widget _racesHeader(BuildContext context) {
    return ListTile(
      title: const Center(child: Text(textScaleFactor: 1.3, "Races")),
      trailing: IconButton(
        icon: const Icon(Icons.add_circle_outline_outlined),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) =>
                  EditRace(race: null, series: series, id: 'not_set'),
            ),
          );
        },
      ),
    );
  }

  Widget _racesList(List<Race> races) {
    if (races.isEmpty) {
      return const Center(
          child: Text(textScaleFactor: 1.2, 'No races to display'));
    } else {
      return Expanded(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8.0),
          child: ListView.separated(
              itemCount: races.length,
              separatorBuilder: (BuildContext context, int index) =>
                  const Divider(),
              itemBuilder: (BuildContext context, int index) {
                final race = races[index];
                final avgLap = race.isAverageLap ? 'Average lap' : '';
                final date = DateFormat("d MMM yy").format(race.scheduledStart);
                final startTime =
                    'Start:  ${DateFormat.Hm().format(race.scheduledStart)}';
                final status = race.status.displayName;
                final type = race.type != RaceType.conventional
                    ? race.type.displayName
                    : "";

                return ListTile(
                  isThreeLine: true,
                  title: Row(
                    children: [
                      Text(race.name),
                      const SizedBox(width: 20),
                      Text(date),
                      const SizedBox(width: 20),
                      Text(startTime)
                    ],
                  ),
                  subtitle: Row(
                    children: [
                      Text(type),
                      const SizedBox(width: 20),
                      Text(status),
                      const SizedBox(width: 20),
                      Text(avgLap),
                    ],
                  ),
                  trailing: IconButton(
                    onPressed: () => {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) =>
                              EditRace(race: race, series: series, id: race.id),
                        ),
                      )
                    },
                    icon: const Icon(Icons.edit),
                  ),
                );
              }),
        ),
      );
    }
  }
}
