import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race-calander/presentation/series_detail.dart';


class RaceSeriesListItem extends StatelessWidget {
  final Series series;

  final DateFormat formatter = DateFormat('dd MMM yy');

  RaceSeriesListItem(this.series, {super.key});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Row(children: [
        Text(series.name),
        const SizedBox(width: 25),
        Text(series.fleetId),
      ]),
      subtitle: Row(
        children: [
          Text('${series.races.length} races'),
          const SizedBox(width: 25),
          series.startDate != null ? Text(
              '${formatter.format(series.startDate!)} to ${formatter.format(series.endDate!)}'): const Text(""),
        ],
      ),
      trailing: IconButton(
        icon: const Icon(Icons.edit_outlined),
        onPressed: () {
          // TODO use go route here
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => SeriesDetailScreen(
                series.id,
              ),
            ),
          );
        },
      ),
    );
  }
}
