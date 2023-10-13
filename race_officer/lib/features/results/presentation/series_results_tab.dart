import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';

class SeriesResultsTab extends ConsumerWidget with UiLoggy {
   SeriesResultsTab({required this.results, super.key});

  final SeriesResults results;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
     return const Column(
       children: [
       //  const RaceChoiceChip(selected: null),
         Center(child: Text('No series to display'))
       ],
     );
  }
}
