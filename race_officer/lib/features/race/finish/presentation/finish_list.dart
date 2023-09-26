import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/finish_item.dart';

class FinishList extends ConsumerWidget with UiLoggy {
  const FinishList({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final competitorsProvider = ref.watch(currentCompetitors);

    return competitorsProvider.when(
        loading: () => const CircularProgressIndicator(),
        error: (error, stackTrace) {
          loggy.error(
              'Error reading competiors:  $error stack trace : ${stackTrace.toString()}');
          return Text(error.toString());
        },
        data: (competitors) {
          // Display all the messages in a scrollable list view.
          if (competitors.isEmpty) {
            return const Center(
              child: Text(textScaleFactor: 1.2, 'No Competitors found'),
            );
          } else {
            return ListView.separated(
              itemCount: competitors.length,
              itemBuilder: (context, index) =>
                  FinishListItem(competitors[index]),
              separatorBuilder: (BuildContext context, int index) =>
                  const Divider(),
            );
          }
        });
  }
}
