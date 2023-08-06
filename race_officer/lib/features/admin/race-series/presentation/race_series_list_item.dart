import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:sailbrowser_flutter/features/admin/race-series/presentation/race_series_detail.dart';

import '../race_series.dart';

class RaceSeriesListItem extends StatelessWidget {
  final RaceSeries series;

  final DateFormat formatter = DateFormat('dd MMM yyyy');

  RaceSeriesListItem(this.series, {super.key});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Row(children: [
        Text(series.name),
        const SizedBox(width: 25),
        Text(series.fleetId),
        const SizedBox(width: 25),
        Text('${series.races.length} races'),
      ]),
      subtitle: Text('Start date: ${formatter.format(series.startDate)}   End date:  ${formatter.format(series.endDate)}'),
      trailing: IconButton(
        icon: const Icon(Icons.edit_outlined),
        onPressed: () {
          // TODO use go route here
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => RaceSeriesDetailScreen(
                series,
              ),
            ),
          );
        },
      ),
    );
  }
}
