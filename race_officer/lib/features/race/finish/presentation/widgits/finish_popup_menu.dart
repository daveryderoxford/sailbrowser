// ignore_for_file: constant_identifier_names

import 'package:flutter/material.dart';

enum FinishPopupMenuItems {
  Finish,
  Lap,
  Pin,
  Retired,
  DidNotStart,
}

class FinishPopupMenu extends StatelessWidget {
  const FinishPopupMenu({required this.onSelected, super.key});

  final Function(FinishPopupMenuItems) onSelected;

  @override
  Widget build(BuildContext context) {
    return MenuAnchor(
        menuChildren: FinishPopupMenuItems.values
            .map(
              (item) => MenuItemButton(
                child: Text(item.name),
                onPressed: () => onSelected(item),
              ),
            )
            .toList(),
        builder:
            (BuildContext context, MenuController controller, Widget? child) {
          return IconButton(
            visualDensity: VisualDensity.compact,
            icon: const Icon(Icons.more_vert),
            onPressed: () {
              if (controller.isOpen) {
                controller.close();
              } else {
                controller.open();
              }
            },
          );
        });
  }
}
