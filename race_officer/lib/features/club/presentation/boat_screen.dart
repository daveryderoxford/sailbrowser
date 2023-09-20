import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/club/presentation/boat_list_item.dart';
import 'package:sailbrowser_flutter/features/club/presentation/boats_service.dart';

import 'boat_edit.dart';

class BoatsScreen extends ConsumerWidget {
  const BoatsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final allBoats = ref.watch(allBoatProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Boats'),
      ),
      body: allBoats.when(
          loading: () => const CircularProgressIndicator(),
          error: (error, stackTrace) => Text(error.toString()),
          data: (boats) {
            // Display all the messages in a scrollable list view.
            return ListView.builder(
              itemCount: boats.length,
              itemBuilder: (context, index) => BoatListItem(boats[index]),
            );
          }),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => const EditBoat(
                      id: '',
                    )),
          );
        },
      ),
    );
  }
}
