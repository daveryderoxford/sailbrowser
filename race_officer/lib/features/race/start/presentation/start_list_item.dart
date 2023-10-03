import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/features/race/start/domain/start_controller.dart';
import 'package:sailbrowser_flutter/features/race/start/domain/start_sequence.dart';
import 'package:sailbrowser_flutter/features/race/start/domain/start_sequence_controller.dart';

class StartListItem extends ConsumerWidget with UiLoggy {
  const StartListItem(this.start, {super.key});

  final StartRecord start;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final startStatus =
        ref.watch(startSequenceProvider.select((value) => value.startStatus));

    return ExpansionTile(
      title: Row(children: [
        // Text(start.date),
        const SizedBox(width: 25),
        Text('Start: ${start.order.toString()}   ${start.races.length} races'),
      ]),
      controlAffinity: ListTileControlAffinity.leading,
      backgroundColor: Theme.of(context).colorScheme.onPrimary,
      shape: const Border(),
      trailing: OutlinedButton(
        onPressed: () {
          if (startStatus == StartStatus.notConfigured) {
            final sequence = ref.read(startSequenceProvider.notifier);
            sequence.configure(
                start.races,
                const Duration(
                    minutes: 2)); // TODO define interval in club and series
          } else {
            loggy.error('Start sequence current in progress');
            const SnackBar(
              content: Text('Start sequence current in progress'),
            );
          }
        },
        child: const Text('Start sequence'),
      ),
      children: start.races
          .map(
            (race) => Text('${race.name}    Fleet: ${race.fleetId}'),
          )
          .toList(),
    );
  }
}
