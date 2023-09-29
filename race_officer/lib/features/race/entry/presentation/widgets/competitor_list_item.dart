import 'package:flutter/material.dart';
import 'package:sailbrowser_flutter/common_widgets/sail_number.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/entry/presentation/entry_edit.dart';

class CompetitorListItem extends StatelessWidget {
  final RaceCompetitor competitor;

  String _subTitle(RaceCompetitor b) {
    String helm = _makeName(b.helm, 'Helm');
    String crew = _makeName(b.crew, 'Crew');

    return ('$helm     $crew');
  }

  _makeName(String? text, String title) {
    return (text != null && text.trim().isNotEmpty) ? '$title: $text' : '';
  }

  const CompetitorListItem(this.competitor, {super.key});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Row(children: [
        Text(competitor.boatClass),
        const SizedBox(width: 25),
        SailNumber(num: competitor.sailNumber),
        const SizedBox(width: 25),
        Text('Handicap: ${competitor.handicap.toString()}'),
      ]),
      subtitle: Text(_subTitle(competitor)),
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
