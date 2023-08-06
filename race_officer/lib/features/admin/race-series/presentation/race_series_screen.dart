import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/common_widgets/stream_listview.dart';

import '../race_series.dart';
import '../race_series_service.dart';
import 'series_edit.dart';
import 'race_series_list_item.dart';

class RaceSeriesScreen extends ConsumerWidget {
  const RaceSeriesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final database = ref.watch(seriesProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Series'),
      ),
      body: StreamListView<RaceSeries>(
        itemStream: database.allRaceSeriess$,
        itemBuilder: (context, series) => RaceSeriesListItem(series),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const EditSeries(
                id: '',
              ),
            ),
          );
        },
      ),
    );
  }
}
