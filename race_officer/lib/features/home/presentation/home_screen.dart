import 'package:clock/clock.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:sailbrowser_flutter/features/authentication/data/firebase_auth_repository.dart';
import 'package:sailbrowser_flutter/features/home/presentation/home_race_list_item.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series_service.dart';
import 'package:sailbrowser_flutter/features/race/domain/selected_races.dart';
import 'package:sailbrowser_flutter/routing/app_router.dart';

enum UserMenuOptions { logout, profile }

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    //  final ButtonStyle textButtonStyle = TextButton.styleFrom(
    //   foregroundColor: Theme.of(context).colorScheme.onPrimary,
    //  );
    return Scaffold(
      appBar: AppBar(
          title: const Text('Home'),
          actions: <Widget>[_buildUserMenuButton(context, ref)]),
      body: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          _racesToday(context, ref),
        ],
      ),
    );
  }

  Widget _racesToday(BuildContext context, WidgetRef ref) {
    final races = ref.watch(allRacesProvider);
    final now = clock.now();
    List<Race> todaysRaces = [];

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        const Text('Todays races'),
        TextButton(
          onPressed: ()  {
            final ids = todaysRaces.map( (race) => race.id).toList();
            ref.read(selectedRaceIdsProvider.notifier).addRace(ids);
          }, 
          child: const Text('Add Races'),
          ),
        SizedBox(
          height: 200,
          child: races.when(
              loading: () => const CircularProgressIndicator(),
              error: (error, stackTrace) => Text(error.toString()),
              data: (races) {
                todaysRaces = races
                    .where((r) =>
                        r.scheduledStart.year == now.year &&
                        r.scheduledStart.month == now.month &&
                        r.scheduledStart.day == now.day)
                    .toList();
                if (todaysRaces.isEmpty) {
                  return const Text('No races today');
                } else {
                  return ListView.builder(
                    itemCount: todaysRaces.length,
                    itemBuilder: (context, index) =>
                        HomeRaceListItem(todaysRaces[index]),
                  );
                }
              }),
        ),
      ],
      //   ),
    );
  }

  _doLogout(BuildContext context, WidgetRef ref) async {
    await ref.read(firebaseAuthProvider).signOut();
    // ignore: use_build_context_synchronously
    context.goNamed(AppRoute.signIn.name);
  }

  Widget _buildUserMenuButton(BuildContext context, WidgetRef ref) {
    return PopupMenuButton<UserMenuOptions>(
      icon: const Icon(Icons.person_2_outlined),
      onSelected: (item) {
        return switch (item) {
          UserMenuOptions.profile => context.goNamed(AppRoute.profile.name),
          UserMenuOptions.logout => _doLogout(context, ref)
        };
      },
      itemBuilder: (BuildContext context) => <PopupMenuEntry<UserMenuOptions>>[
        const PopupMenuItem<UserMenuOptions>(
          value: UserMenuOptions.logout,
          child: Text('Logout'),
        ),
        const PopupMenuItem<UserMenuOptions>(
          value: UserMenuOptions.profile,
          child: Text('User details'),
        ),
      ],
    );
  }
}
