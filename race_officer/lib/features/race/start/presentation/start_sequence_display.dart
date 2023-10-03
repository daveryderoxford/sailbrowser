import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race/start/domain/start_sequence.dart';
import 'package:sailbrowser_flutter/features/race/start/domain/start_sequence_controller.dart';
import 'package:sailbrowser_flutter/util/date_time_extensions.dart';
import 'package:sailbrowser_flutter/util/duration_extensions.dart';

class StartSequenceDisplay extends ConsumerWidget {
  const StartSequenceDisplay({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final sequence = ref.watch(startSequenceProvider);
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text('Next Start:  ${sequence.timeToNextStart.asHourMinSec()}',
            textScaleFactor: 1.7,
            style: const TextStyle(fontWeight: FontWeight.bold)),
        const SizedBox(height: 20),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children:  _actionButtons(context, ref, sequence.startStatus),
        ),
        const SizedBox(height: 20),
        Expanded(
          child: ListView.separated(
              separatorBuilder: (context, index) => const Divider(),
              itemCount: sequence.races.length,
              itemBuilder: (context, index) {
                final race = sequence.races[index];
                return ListTile(
                  title: Row(
                    children: [
                      Text(race.name),
                      const SizedBox(width: 20),
                      Text('Start ${race.actualStart.asHourMin()}'),
                    ],
                  ),
                  subtitle: Row(
                    children: [
                      Text('Fleet: ${race.fleetId}'),
                      const SizedBox(width: 20),
                      Text('Race : ${race.raceOfDay.toString()}')
                    ],
                  ),
                );
              }),
        ),
      ],
    );
  }

  _actionButtons(BuildContext context, WidgetRef ref, StartStatus status) {
    final startSeqService = ref.read(startSequenceProvider.notifier);
    switch (status) {
      case StartStatus.waiting || StartStatus.stopped:
        return [
          FilledButton(
            onPressed: () => startSeqService.run(StartWhen.nextMinute),
            child: const Text("Start sequence (next minute)"),
          ),
          FilledButton(
            onPressed: () => startSeqService.reset(), // Add confirmation dialog
            child: const Text("Abort"),
          ),
        ];
      case StartStatus.running:
        return [
          FilledButton.tonal(
            onPressed: () => startSeqService.stopStartSequence(),
            child: const Text("Stop/Postpone"),
          ),
          FilledButton.tonal(
            onPressed: () => startSeqService.generalRecall(false), 
            // TODO need to specify if race sould be move dto the end or not
            child: const Text("General Recall"),
          ),
        ];
      case StartStatus.finished:
        return [
          FilledButton(
            onPressed: () => startSeqService.reset(),
            child: const Text("Select new start block"),
          ),
        ];
      case StartStatus.notConfigured:
        throw ("Races nust be configured ot display the start sequence screen");
    }
  }
}
