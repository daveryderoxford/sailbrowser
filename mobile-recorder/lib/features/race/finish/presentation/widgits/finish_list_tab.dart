import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race/finish/domain/finish_lists.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/widgits/finish_list_item.dart';

import 'finished_list_item.dart';

class FinishListTab extends ConsumerWidget with UiLoggy {
  const FinishListTab({this.racing = true, this.filtered = false, super.key});

  final bool racing;
  final bool filtered;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final competitors = filtered
        ? ref.watch(filteredCompetitorListProvider)
        : ref.watch(racingCompetitorsProvider(racing));

    return competitors.isEmpty
        ? const Center(
            child: Text(textScaleFactor: 1.2, 'No Competitors found'),
          )
        : ListView.separated(
            padding: const EdgeInsets.only(left: 0.0, right: 0.0),
            itemCount: competitors.length,
            itemBuilder: (context, index) => racing
                ? FinishListItem(competitors[index])
                : FinishedListItem(competitors[index]),
            separatorBuilder: (BuildContext context, int index) =>
                const Divider(),
          );
  }
}
