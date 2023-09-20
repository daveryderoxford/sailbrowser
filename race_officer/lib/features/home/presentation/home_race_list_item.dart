import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:sailbrowser_flutter/common_widgets/null_widget.dart';
import 'package:sailbrowser_flutter/features/club/domain/clubs_service.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series_service.dart';

class HomeRaceListItem extends ConsumerWidget {
  final Race race;

  final DateFormat formatter = DateFormat('dd MMM yy');

  HomeRaceListItem(this.race, {super.key});

  @override
  Widget build(BuildContext context, ref) {
    final currectClub = ref.watch(currentClubProvider);
    final series = ref.watch(allSeriesProvider).mapOrNull(
        data: (all) => (all.value.where((s) => s.id == race.seriesId)).firstOrNull);
    final fleet =
        currectClub.current.fleets.firstWhere((f) => (f.id == race.fleetId));

    return ListTile(
        title: Row(children: [
          series != null ? Text(series.name) : const NullWidget(),
          const SizedBox(width: 25),
          Text(race.name),
        ]),
        subtitle: Row(
          children: [
            Text('Fleet: ${fleet.name}'),
            const SizedBox(width: 25),
            Text('Start number: ${race.raceOfDay.toString()}'),
          ],
        ));
  }
}
