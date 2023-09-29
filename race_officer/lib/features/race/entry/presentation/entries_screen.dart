import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor_service.dart';
import 'package:sailbrowser_flutter/features/race/entry/presentation/entry_add.dart';
import 'package:sailbrowser_flutter/features/race/entry/presentation/widgets/competitor_list_item.dart';

class EntriesScreen extends ConsumerWidget with UiLoggy {
  const EntriesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final competitorsProvider = ref.watch(currentCompetitors);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Entries'),
      ),
      body: competitorsProvider.when(
        loading: () => const CircularProgressIndicator(),
        error: (error, stackTrace) {
          loggy.error( 'Error reading competiors:  $error stack trace : ${stackTrace.toString()}');
          return Text(error.toString());
        },
        data: (competitors) {
          // Display all the messages in a scrollable list view.
          if (competitors.isEmpty) {
            return const Center(
              child: Text(textScaleFactor: 1.2, 'No entries for races today'),
            );
          } else {
            return ListView.separated(
              itemCount: competitors.length,
              itemBuilder: (context, index) =>
                  CompetitorListItem(competitors[index]),
              separatorBuilder: (BuildContext context, int index) =>
                  const Divider(),
            );
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const AddEntry(),
            ),
          );
        },
      ),
    );
  }
}
