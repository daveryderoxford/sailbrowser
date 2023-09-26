import 'package:flutter/material.dart';
import 'package:sailbrowser_flutter/common_widgets/sail_number.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/finish_popup_menu.dart';

class FinishListItem extends StatelessWidget {
  final RaceCompetitor competitor;

  String _subTitle(RaceCompetitor b) {
    return (b.crew != null || b.crew!.trim().isNotEmpty)
        ? '${b.helm} / ${b.crew}'
        : b.helm;
  }

  const FinishListItem(this.competitor, {super.key});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Row(children: [
        Text(competitor.boatClass),
        const SizedBox(width: 25),
        SailNumber(num: competitor.sailNumber),
      ]),
      subtitle: Text(_subTitle(competitor)),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextButton(
            onPressed: () {},
            child: const Text('Finish'),
          ),
          TextButton(
            onPressed: () {},
            child: const Text('Lap'),
          ), 
          FinishPopupMenu( onSelected: (action) {},),
        ],
      ),
    );
  }
}
