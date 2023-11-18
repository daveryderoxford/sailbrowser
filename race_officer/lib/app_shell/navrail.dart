import 'package:flutter/material.dart';

import 'destinations.dart';

class AppNavigationRail extends StatelessWidget {
  const AppNavigationRail({
    super.key,
    required this.body,
    required this.backgroundColor,
    required this.selectedIndex,
    required this.onDestinationSelected,
  });

  final Widget body;
  final Color backgroundColor;
  final int selectedIndex;
  final ValueChanged<int>? onDestinationSelected;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;
    return Scaffold(
      body: Row(
        children: [
          NavigationRail(
            selectedIndex: selectedIndex,
            onDestinationSelected: onDestinationSelected,
            labelType: NavigationRailLabelType.all,
            groupAlignment: -0.85,
            destinations: destinations.map((d) {
              return NavigationRailDestination(
                icon: Icon(d.icon),
                label: Text(d.label),
              );
            }).toList(),
          ),
          const VerticalDivider(thickness: 1, width: 1),
          // This is the main content.
          Expanded(
            child: body,
          ),
        ],
      ),
    );
  }

  Widget _buildLeadingActionButton(colorScheme) {
    return FloatingActionButton(
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.all(
          Radius.circular(15),
        ),
      ),
      backgroundColor: colorScheme.tertiaryContainer,
      foregroundColor: colorScheme.onTertiaryContainer,
      onPressed: () {},
      child: const Icon(Icons.add),
    );
  }
}
