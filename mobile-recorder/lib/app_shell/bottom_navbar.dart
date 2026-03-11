import 'package:flutter/material.dart';

import 'destinations.dart';

class AppBottomNavigationBar extends StatelessWidget {
  const AppBottomNavigationBar(
      {super.key,
      required this.selectedIndex,
      required this.onDestinationSelected,
      required this.body});

  final int selectedIndex;
  final ValueChanged<int>? onDestinationSelected;
  final Widget body;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: body,
        bottomNavigationBar: NavigationBar(
          elevation: 0,
          backgroundColor: Colors.white,
          selectedIndex: selectedIndex,
          onDestinationSelected: onDestinationSelected,
          destinations: destinations.map<NavigationDestination>((d) {
            return NavigationDestination(
              icon: Icon(d.icon),
              label: d.label,
            );
          }).toList(),
        ));
  }
}
