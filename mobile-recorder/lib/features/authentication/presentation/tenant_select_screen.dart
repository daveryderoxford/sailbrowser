import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/features/authentication/data/selected_tenant.dart';
import 'package:sailbrowser_flutter/features/authentication/data/tenant_list.dart';
import 'package:sailbrowser_flutter/routing/app_router.dart';

class TenantSelectScreen extends ConsumerWidget with UiLoggy {
  const TenantSelectScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final tenants = ref.watch(tenantListProvider);
    ref.watch(selectedTenantProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Club'),
      ),
      body: ResponsiveCenter(
        maxContentWidth: 500,
        child: Card(
          child: tenants.when(
            data: (data) => Column(
              children: [
                const Text('Select a club'),
                DropdownButton<TenantListData>(
                  items: data.map((value) {
                    return DropdownMenuItem<TenantListData>(
                      value: value,
                      child: Text(value.name),
                    );
                  }).toList(),
                  onChanged: (value) {
                    String t = value!.tenant;
                    ref.read(selectedTenantProvider.notifier).set(t);
                    context.goNamed(AppRoute.signIn.name);
                  },
                ),
              ],
            ),
            loading: () => const CircularProgressIndicator(),
            error: (error, stackTrace) {
              logError(
                  'Error obtaining list of tenants:  $error stack trace : ${stackTrace.toString()}');
              return Text(error.toString());
            },
          ),
        ),
      ),
    );
  }
}
