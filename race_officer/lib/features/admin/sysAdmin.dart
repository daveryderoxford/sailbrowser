
import "package:cloud_firestore/cloud_firestore.dart";
import "package:flutter/material.dart";
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/club/domain/boats_service.dart';

class SysdminScreen extends ConsumerWidget {
  const SysdminScreen({super.key});

 
 @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin'),
      ),
      body: Column(children: [
        OutlinedButton(
          onPressed: () => doReformat(ref), 
          child: const Text('Reformat database'))

      ],)
    );
  }
  doReformat(WidgetRef ref)  {
    final fs = FirebaseFirestore.instance;
    final boats = ref.read(allBoatProvider).requireValue;
    for (var b in boats) {
      final doc = fs.doc('boats/${b.id}');
      doc.set(b.toJson());
    }
    

  }
}
