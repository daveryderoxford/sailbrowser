import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/common_widgets/null_widget.dart';
import 'package:sailbrowser_flutter/common_widgets/sail_number.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/finish_controller.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/finsh_manual_entry.dart';
import 'package:sailbrowser_flutter/util/date_time_extensions.dart';
import 'package:sailbrowser_flutter/util/duration_extensions.dart';

class FinishedListItem extends ConsumerWidget {
  final RaceCompetitor competitor;
  final bool showButtons;

  String _subTitle(RaceCompetitor comp) {
    final finishTime = (comp.finishTime == null)
        ? ""
        : 'Finish:  ${comp.finishTime?.asHourMinSec()}';
    final totalTime = 'Total time: ${comp.totalTime.asHourMinSec()}';
    final status = 'Status:  ${comp.resultCode.displayName}';
    return ('${comp.helmCrew}    $status\n$finishTime   $totalTime  ');
  }

  const FinishedListItem(this.competitor, {this.showButtons= true, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ListTile(
      isThreeLine: true,
      title: Row(children: [
        Text(competitor.boatClass),
        const SizedBox(width: 25),
        SailNumber(num: competitor.sailNumber),
      ]),
      subtitle: Text(_subTitle(competitor)),
      trailing: (!showButtons) ? const NullWidget() : Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextButton(
             style: TextButton.styleFrom(
    visualDensity: VisualDensity.compact,
    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
  ),
            onPressed: () =>
                ref.read(finshControllerProvider).stillRacing(competitor),
            child: const Text('Undo'),
          ),
          TextButton(
                         style: TextButton.styleFrom(
    visualDensity: VisualDensity.compact,
    tapTargetSize: MaterialTapTargetSize.shrinkWrap,
  ),
            onPressed: () => Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => FinishManualEntry(competitor: competitor),
              ),
            ),
            child: const Text('Edit'),
          ),
        ],
      ), 
    );
  }
}
