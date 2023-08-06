import 'package:flutter/material.dart';
import 'package:sailbrowser_flutter/common_widgets/sail_number.dart';
import 'package:sailbrowser_flutter/features/admin/boats/boat_edit.dart';
import 'package:sailbrowser_flutter/models/boat.dart';

class BoatListItem extends StatelessWidget {
  final Boat boat;

  String _subTitle(Boat b) {
    String helm = _makeName(b.helm, 'Helm');
    String crew = _makeName(b.crew, 'Crew');
    String owner = _makeName(b.owner, 'Owner');

    return ('$helm     $crew     $owner');
  }

  _makeName(String? text, String title) {
    return (text != null || text!.isEmpty) ? '$title: $text' : null;
  }

  const BoatListItem(this.boat, {super.key});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Row(children: [
        Text(boat.sailingClass),
        const SizedBox(width: 25),
        SailNumber(num: boat.sailNumber),
        const SizedBox(width: 25),
        Text(boat.type.name)
      ]),
      subtitle: Text(_subTitle(boat)),
      trailing: IconButton(
        icon: const Icon(Icons.edit_outlined),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => EditBoat(
                boat: boat,
                id: boat.id,
              ),
            ),
          );
        },
      ),
    );
  }
}
