import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../common_widgets/sail_number.dart';
import '../../../models/boat.dart';
import 'boat_edit.dart';
import 'boats_service.dart';

class BoatList extends  ConsumerWidget {
  final List<Boat> _boatList;

  const BoatList(this._boatList, {super.key}); 

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final database = ref.watch( boatsProvider); 
    return _boatList.isNotEmpty 
        ? ListView.separated(
            itemCount: _boatList.length, 
            separatorBuilder: (BuildContext context, int index) => const Divider(),
            itemBuilder: (BuildContext context, int index) {
              final currentBoat = _boatList[index];
              return Dismissible(
                // So as to delete the boat as it is slided .
                onDismissed: (_) async { await database.remove(currentBoat.id); },
                key: Key(_boatList[index].id),
                child: ListTile(
                    title: Text(currentBoat.sailingClass ),
                    subtitle: SailNumber(num: currentBoat.sailNumber),
                    trailing: IconButton(
                      icon: const Icon(Icons.edit_outlined),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => EditBoat(
                                    isFromEdit: true,
                                    boat: currentBoat,
                                    id: currentBoat.id,
                                  )),
                        );
                      },
                    )),
              );
            })
        : const Center(child: Text('No Boats displayed')); // show if there are no boats .
  }
}
