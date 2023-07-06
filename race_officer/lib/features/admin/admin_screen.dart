import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:sailbrowser_flutter/routing/app_router.dart';

class AdminScreen extends StatelessWidget {
  const AdminScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
        child: TextButton(child: const Text("Boats"), onPressed: () => context.goNamed(AppRoute.boats.name))
    );
  }
}
