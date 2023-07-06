import 'package:flutter/material.dart';

class EntriesScreen extends StatelessWidget {
  const EntriesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Enteries'),
        ),
        body: const Center(child: Text("Entries Screen")));
  }
}
