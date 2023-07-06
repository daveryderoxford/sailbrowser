// File generated by FlutterFire CLI.
// ignore_for_file: lines_longer_than_80_chars, avoid_classes_with_only_static_members
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyDJMflCnJkd4oFIHHVBSCh2C9sD8tiwUoA',
    appId: '1:500477680330:web:8fae64d733a9772b67b233',
    messagingSenderId: '500477680330',
    projectId: 'sailbrowser-efef0',
    authDomain: 'sailbrowser-efef0.firebaseapp.com',
    storageBucket: 'sailbrowser-efef0.appspot.com',
    measurementId: 'G-KJRV036MH7',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyCMKqvoX6Prslr9Na6kqRvebaOlxs_sBl8',
    appId: '1:500477680330:android:ac6112129f62ddab67b233',
    messagingSenderId: '500477680330',
    projectId: 'sailbrowser-efef0',
    storageBucket: 'sailbrowser-efef0.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyDYqVGoqvlZa3xFDg17jKoEGU_xTopYyJg',
    appId: '1:500477680330:ios:c0df7d3e9ea8548467b233',
    messagingSenderId: '500477680330',
    projectId: 'sailbrowser-efef0',
    storageBucket: 'sailbrowser-efef0.appspot.com',
    iosClientId: '500477680330-47dvjf8dubf06vvlble4fkutn767rbdv.apps.googleusercontent.com',
    iosBundleId: 'com.example.sailbrowserFlutter',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyDYqVGoqvlZa3xFDg17jKoEGU_xTopYyJg',
    appId: '1:500477680330:ios:51882942dc77babe67b233',
    messagingSenderId: '500477680330',
    projectId: 'sailbrowser-efef0',
    storageBucket: 'sailbrowser-efef0.appspot.com',
    iosClientId: '500477680330-tl5k0rat6ic4e5i4n3lhdn6698qrgh0n.apps.googleusercontent.com',
    iosBundleId: 'com.example.sailbrowserFlutter.RunnerTests',
  );
}
