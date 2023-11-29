import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

final sharedPrefs =
    FutureProvider<SharedPreferences>((_) async => await SharedPreferences.getInstance());

class SelectedTenant extends Notifier<String?> {

  @override
  String? build() {
    // Shared preferences shall be initilaised on startup
    final pref = ref.watch(sharedPrefs).requireValue;
    return pref.getString('tenant');
  }

  set(String id) {
    ref.read(sharedPrefs).requireValue.setString('tenant', id);
    state = id;
  }
}

final selectedTenantProvider = NotifierProvider( SelectedTenant.new );