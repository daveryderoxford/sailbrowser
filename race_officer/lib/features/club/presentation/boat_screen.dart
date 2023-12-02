import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/constants/app_sizes.dart';
import 'package:sailbrowser_flutter/features/club/presentation/widgets/boat_list_item.dart';
import 'package:sailbrowser_flutter/features/club/domain/boats_service.dart';

import 'boat_edit.dart';

class BoatsScreen extends ConsumerStatefulWidget {
  const BoatsScreen({super.key});

  @override
  ConsumerState<BoatsScreen> createState() => _BoatsScreenState();
}

class _BoatsScreenState extends ConsumerState<BoatsScreen> {
  String filter = '';

  @override
  Widget build(BuildContext context) {
    final allBoats = ref.watch(allBoatProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Boats'),
      ),
      body: ResponsiveCenter(
        maxContentWidth: 850,
        child: Column(
          children: [
            gapH4,
            Center(
              child: SizedBox( width: 300,
                child: TextField(
                  decoration: const InputDecoration(
                    prefixIcon: Icon(Icons.search),
                    suffixIcon: Icon(Icons.clear),
                    labelText: 'Filter',
                    helperText: 'Filter on helm, crew, class, sail number',
                    border: OutlineInputBorder(),
                  ),
                  onChanged: (value) => setState(() => filter = value.toLowerCase()),
                ),
              ),
            ),
            Expanded(
              child: allBoats.when(
                  loading: () => const CircularProgressIndicator(),
                  error: (error, stackTrace) => Text(error.toString()),
                  data: (boats) {
                    final filteredBoats = boats
                        .where((boat) =>
                            boat.helm.toLowerCase().contains(filter) ||
                            boat.crew.toLowerCase().contains(filter) ||
                            boat.sailNumber.toString().contains(filter) ||
                            boat.boatClass.toLowerCase().contains(filter))
                        .toList();
                    // Display all the messages in a scrollable list view.
                    return ListView.builder(
                      shrinkWrap: true,
                      itemCount: filteredBoats.length,
                      itemBuilder: (context, index) =>
                          BoatListItem(filteredBoats[index]),
                    );
                  }),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const EditBoat(
                id: '',
              ),
            ),
          );
        },
      ),
    );
  }
}
