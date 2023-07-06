import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:sailbrowser_flutter/features/authentication/data/firebase_auth_repository.dart';

import '../../routing/app_router.dart';

enum UserMenuOptions { logout, profile }

class HomeScreen extends ConsumerWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
  //  final ButtonStyle textButtonStyle = TextButton.styleFrom(
   //   foregroundColor: Theme.of(context).colorScheme.onPrimary,
  //  );
    return Scaffold(
        appBar: AppBar(title: const Text('Home'), 
           actions: <Widget>[ _buildUserMenuButton(context, ref)]
        ),
        body: const Center(child: Text("Home Screen")));
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


