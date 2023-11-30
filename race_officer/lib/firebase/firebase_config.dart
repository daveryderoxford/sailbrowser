import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/features/authentication/data/selected_tenant.dart';

import 'firebase_options.dart';

class FirebaseConfig with UiLoggy {
  static final FirebaseConfig _instance = FirebaseConfig();

  factory FirebaseConfig.instance() {
    return _instance;
  }

  FirebaseConfig();

 // Future<FirebaseApp> startup(bool useEmulator, String tenant) async {
   Future<FirebaseApp> startup(bool useEmulator) async {

    try {

      
      final app = await Firebase.initializeApp(
          options: DefaultFirebaseOptions.currentPlatform);

      if (useEmulator) {
        await useEmulators();
      }

      logInfo("Firebase app: ${app.toString()}");

      // Enable Firestore persistance for web.  Enabled on ios/aidroid by default
      final db = FirebaseFirestore.instance;
  //    final db = FirebaseFirestore.instanceFor(app: Firebase.app(), databaseURL: tenant);
      if (kIsWeb) {
        await db.enablePersistence(
            const PersistenceSettings(synchronizeTabs: true));
        // Persist auth session to DB.  For true web platform this should be a user controlled option
        // to avoid saving session data on public platforms
        FirebaseAuth.instance.setPersistence(Persistence.INDEXED_DB);
      }

      // Wait for first logon event before displaying app to ensure saved login is applied
      // TODO not sure if this is necessary
      final user = await FirebaseAuth.instance.authStateChanges().first;
      final msg = (user != null)
          ? "Using saved login details. ${user.displayName}"
          : "No saved login details";
      logInfo(msg);

      logInfo('Clearing Firebase cache');
      FirebaseFirestore.instance.clearPersistence();

      return app;
    } catch (e) {
      logError(e.toString());
      rethrow;
    }

 
  }

  useEmulators() async {
    await FirebaseAuth.instance.useAuthEmulator('localhost', 9099);
    FirebaseFirestore.instance.useFirestoreEmulator('localhost', 8080);
    logInfo('Using Firebase emulators');
  }
}

/// Provider for firestore database
final firestoreProvider = Provider<FirebaseFirestore>((ref) {
  final selectedTenant = ref.watch(selectedTenantProvider);
  return FirebaseFirestore.instanceFor(
      app: Firebase.app(), databaseURL: selectedTenant);
});
