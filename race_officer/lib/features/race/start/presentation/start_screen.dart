import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/time_display.dart';
import 'package:sailbrowser_flutter/features/race/start/domain/start_controller.dart';
import 'package:sailbrowser_flutter/features/race/start/domain/start_sequence.dart';
import 'package:sailbrowser_flutter/features/race/start/domain/start_sequence_controller.dart';
import 'package:sailbrowser_flutter/features/race/start/presentation/start_list_item.dart';
import 'package:sailbrowser_flutter/features/race/start/presentation/start_sequence_display.dart';

class StartScreen extends ConsumerWidget with UiLoggy {
  const StartScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    //  final ButtonStyle textButtonStyle = TextButton.styleFrom(
    //   foregroundColor: Theme.of(context).colorScheme.onPrimary,
    //  );
    final startStatus =
        ref.watch(startSequenceProvider.select((value) => value.startStatus));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Start'),
      ),
      body: (startStatus == StartStatus.notConfigured)
          ? _startsList(context, ref)
          : const StartSequenceDisplay(),
    );
  }

  Widget _startsList(BuildContext context, WidgetRef ref) {
    final starts = ref.watch(startListProvider);

    return (starts.isEmpty)
        ? const Center(
            child: Text(
              textAlign: TextAlign.center,
              textScaleFactor: 1.2,
              'No races to start today.\nSelect more races on homepage if required',
            ),
          )
        : Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  Padding(
                    padding: EdgeInsets.only(right: 25.0),
                    child: TimeDisplay(
                      textScaleFactor: 1.2,
                      format: "hh:mm:ss",
                    ),
                  ),
                ],
              ),
              const SizedBox(
                height: 15,
              ),
              Expanded(
                child: ListView.builder(
                  itemCount: starts.length,
                  itemBuilder: (context, index) => StartListItem(starts[index]),
                ),
              ),
            ],
          );
  }
}
