import 'package:flutter/material.dart';
import 'package:sailbrowser_flutter/common_widgets/helm_crew.dart';
import 'package:sailbrowser_flutter/common_widgets/sail_number.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/entry/presentation/entry_edit.dart';

class CompetitorListItem extends StatelessWidget {
  final RaceCompetitor competitor;

  const CompetitorListItem(this.competitor, {super.key});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Row(children: [
        Text(competitor.boatClass),
        const SizedBox(width: 25),
        SailNumber(num: competitor.sailNumber),
      ]),
      subtitle: Column(
        children: [
          HelmCrewText(helm: competitor.helm, crew: competitor.crew),
          Text('Handicap: ${competitor.handicap.toString()}'),
        ],
      ),
      trailing: IconButton(
        icon: const Icon(Icons.edit_outlined),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => EditEntry(
                raceCompetitor: competitor,
                id: competitor.id,
              ),
            ),
          );
        },
      ),
    );
  }
}
