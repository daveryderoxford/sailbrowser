  
  import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/admin/boats/boats_service.dart';

import 'boat_list.dart';

class BoatsScreen extends ConsumerWidget {
  const BoatsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final database = ref.watch(boatsProvider);
    return   Center(
        child: StreamBuilder(
        stream: database.allBoats$,
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.error != null) {
            return const Center(
                child: Text(
                    'Some error occurred')); // Show an error just in case(no internet etc)
          }
          return BoatList(snapshot.data!);
        },
      )); 
    
    /*  floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => const EditBoat( isFromEdit: false )),
          );
        },
      ),*/
  }
}
