import 'package:flutter/material.dart';
import 'package:sailbrowser_flutter/features/race/entry/presentation/entries_screen.dart';
import 'package:sailbrowser_flutter/features/race/entry/presentation/widgets/competitor_list_item.dart';

class RaceEntriesListItem extends StatelessWidget {
  final EntryRecord raceEntries;

  const RaceEntriesListItem(this.raceEntries, {super.key});

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      title: Text(raceEntries.race.name),
      subtitle: Text(raceEntries.race.fleetId),
      backgroundColor: Theme.of(context).colorScheme.surface,
      shape: const Border(),
      children: raceEntries.competitors
          .map((comp) => CompetitorListItem(comp))
          .toList(),
    );
  }
}
