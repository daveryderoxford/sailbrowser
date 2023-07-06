import 'package:flutter/material.dart';

class StartScreen extends StatelessWidget {
  const StartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Start'),
        ),
        body: Center(
            child: FloatingActionButton.extended(
          onPressed: () {
            // TO DO
          },
          label: const Text('Start Race'),
          icon: const Icon(Icons.thumb_up),
          backgroundColor: Colors.pink,
        )));
  }
}
