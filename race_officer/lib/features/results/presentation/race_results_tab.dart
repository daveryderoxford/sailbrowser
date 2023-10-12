import 'package:flutter/material.dart';
import 'package:loggy/loggy.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class RaceResultsTab extends ConsumerWidget with UiLoggy {
  const RaceResultsTab({super.key});


  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return const Center( child: Text(textScaleFactor: 1.2,'Race Results Tab'));
  }
}
