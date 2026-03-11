import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:loggy/loggy.dart';
import 'bottom_navbar.dart';
import 'navrail.dart';

// Stateful navigation based on:
// https://github.com/flutter/packages/blob/main/packages/go_router/example/lib/stateful_shell_route.dart
class AppShell extends ConsumerWidget with UiLoggy{
   AppShell({
    Key? key,
    required this.navigationShell,
  }) : super(
            key: key ?? const ValueKey<String>('ScaffoldWithNestedNavigation'));

  final StatefulNavigationShell navigationShell;

  void _goBranch(int index) {
    // navigate to initial location when tapping the item that is already active.
    final initial = index == navigationShell.currentIndex;
    navigationShell.goBranch(index, initialLocation: initial);
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    ref.watch(appShellStateProvider);

    final size = MediaQuery.sizeOf(context);
    final wideScreen = size.width > 600;
    final colorScheme = Theme.of(context).colorScheme;
    final backgroundColor = Color.alphaBlend(
        colorScheme.primary.withOpacity(0.14), colorScheme.surface);
    if (wideScreen) {
      return AppNavigationRail(
          selectedIndex: navigationShell.currentIndex,
          backgroundColor: backgroundColor,
          onDestinationSelected: (index) {
            ref.read(appShellStateProvider.notifier)._setTabChanged(index);
            _goBranch(index);
          },
          body: navigationShell);
    } else {
      return AppBottomNavigationBar(
          selectedIndex: navigationShell.currentIndex,
          onDestinationSelected: (index) {
            ref.read(appShellStateProvider.notifier)._setTabChanged(index);
            _goBranch(index);
          },
          body: navigationShell);
    }
  }
}

/// Selected application tab index ()
final appShellStateProvider = NotifierProvider<AppShellNotiifer, int>(AppShellNotiifer.new);

class AppShellNotiifer extends Notifier<int> {

  @override
  build() => 0;

  _setTabChanged(int index) {
    state = index;
  }

}
