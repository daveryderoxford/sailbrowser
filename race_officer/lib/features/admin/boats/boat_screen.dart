import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/common_widgets/stream_listview.dart';
import 'package:sailbrowser_flutter/features/admin/boats/boat_list_item.dart';
import 'package:sailbrowser_flutter/features/admin/boats/boats_service.dart';
import 'package:sailbrowser_flutter/models/boat.dart';

import 'boat_edit.dart';

class BoatsScreen extends ConsumerWidget {
  const BoatsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final database = ref.watch(boatsProvider);
    return Scaffold(
      appBar: AppBar(
            title: const Text('Boats'),
      ),
      body: StreamListView<Boat>(
        itemStream: database.allBoats$,
        itemBuilder: (context, boat) => BoatListItem(boat),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => const EditBoat(id: '',)),
          );
        },
      ),
    );
  }
}
