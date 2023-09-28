import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/common_widgets/sail_number.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/race/finish/presentation/finish_controller.dart';
import 'package:sailbrowser_flutter/util/date_time_extensions.dart';
import 'package:sailbrowser_flutter/util/duration_extensions.dart';

class FinishedListItem extends ConsumerWidget {
  final RaceCompetitor competitor;

  String _subTitle(RaceCompetitor comp) {
    final finishTime = 'Finish:  ${comp.finishTime!.asHourMinSec()}';
    final elapsedTime = 'Elapsed: ${comp.elapsedTime.asHourMinSec()}';
    return ('${comp.helmCrew} \n$finishTime    $elapsedTime ');
  }

  const FinishedListItem(this.competitor, {super.key});

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
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextButton(
            onPressed: () =>
                ref.read(finshControllerProvider).stillRacing(competitor),
            child: const Text('Undo'),
          ),
        ],
      ),
    );
  }
}
