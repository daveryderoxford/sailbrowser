import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/common_widgets/sail_number.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/widgits/finish_popup_menu.dart';

import '../finish_controller.dart';

class FinishListItem extends ConsumerWidget {
  final RaceCompetitor competitor;
  final bool showButtons;

  String _subTitle(RaceCompetitor comp) {
    return '${comp.helmCrew}  ${comp.numLaps.toString()} laps';
  }

  const FinishListItem(this.competitor, {this.showButtons= true, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {

    return ListTile(
      contentPadding: const EdgeInsets.only(left: 15, right: 5.0),
      visualDensity: VisualDensity.compact,
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
                         style: TextButton.styleFrom(
    visualDensity: VisualDensity.compact,
    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
  ),
            onPressed: () => ref.read(finshControllerProvider).finish(competitor),
            child: const Text('Finish'),
          ),
          TextButton(
                         style: TextButton.styleFrom(
    visualDensity: VisualDensity.compact,
    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
  ),
            onPressed: () => ref.read(finshControllerProvider).lap(competitor),
            child: const Text('Lap'),
          ), 
          FinishPopupMenu( onSelected: (action) {
             final controller = ref.read(finshControllerProvider);
            switch (action) {
              case FinishPopupMenuItems.DidNotStart:
                controller.didNotStart(competitor);
              case FinishPopupMenuItems.Finish:
                 controller.finish(competitor);
             case FinishPopupMenuItems.Lap:
                 controller.lap(competitor);
             case FinishPopupMenuItems.Pin:
                 controller.pin(competitor);
             case FinishPopupMenuItems.Retired:
                 controller.retired(competitor);
              default:
            }
          },),
        ],
      ),
    );
  }
}
