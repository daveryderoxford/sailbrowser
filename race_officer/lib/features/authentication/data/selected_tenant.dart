import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/util/shared_prefs.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SelectedTenant extends Notifier<String?> {
  final SharedPreferences prefs;

  SelectedTenant(this.prefs);

  @override
  String? build() {
    return prefs.getString('tenant');
  }

  set(String id) {
    prefs.setString('tenant', id);
    state = id;
  }
}

/// Selected tenant.
/// Initialsed from shared preference storage. 
final selectedTenantProvider = NotifierProvider<SelectedTenant, String?>( () => SelectedTenant(SharedPrefsSingleton.instance) );