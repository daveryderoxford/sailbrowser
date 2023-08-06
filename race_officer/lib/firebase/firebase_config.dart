import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';
import 'package:loggy/loggy.dart';

import 'firebase_options.dart';

class FirebaseConfig with UiLoggy {
  static final FirebaseConfig _instance = FirebaseConfig();

  factory FirebaseConfig.instance() {
    return _instance;
  }

  FirebaseConfig();

  Future<FirebaseApp> startup() async {
    try {
      final app = await Firebase.initializeApp(
          options: DefaultFirebaseOptions.currentPlatform);

      await useEmulators();

      loggy.info("Firebase app: ${app.toString()}");

      // Enable Firestore persistance for web.  Enabled on ios/aidroid by default
      final db = FirebaseFirestore.instance;
      if (kIsWeb) {
    //    await db.enablePersistence(
    //        const PersistenceSettings(synchronizeTabs: true));
    //    FirebaseAuth.instance.setPersistence(Persistence.SESSION);
      }

      // Wait for first logon event before displaying app to ensure saved login is applied
      final user = await FirebaseAuth.instance.authStateChanges().first;
      final msg = (user != null)
          ? "Using saved login details. ${user.displayName}"
          : "No saved login details";
      loggy.info(msg);

      return app;
    } catch (e) {
      loggy.error(e.toString());
      rethrow;
    }
  }

  useEmulators() async {
 //   await FirebaseAuth.instance.useAuthEmulator('localhost', 9099);
    FirebaseFirestore.instance.useFirestoreEmulator('localhost', 8080);
    loggy.info('Using Firebase emulators');
  }
}
