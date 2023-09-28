import 'package:clock/clock.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/snackbar_service.dart';
import 'package:sailbrowser_flutter/routing/app_router.dart';
import 'package:stack_trace/stack_trace.dart';
import 'firebase/firebase_config.dart';

Duration clockOffset = const Duration();
/// Gert the clock to use for system time
/// in debug mode always initialise to 15 sept 2023 at 10:00
Clock getClock() {
  if (kDebugMode) {
    logInfo("Print using debug clock");
    if (clockOffset.inMicroseconds == 0) {
      final startTime = DateTime(2023, 09, 10, 10, 0, 0);
      clockOffset = DateTime.now().difference(startTime);
    }
    return Clock(() => DateTime.now().subtract(clockOffset));
  } else {
    return const Clock();
  }
}

main() async {
  // Initialise logging
  Loggy.initLoggy();

  withClock(
    getClock(),
    () async {
      logInfo('Clock set to ${clock.now().toString()}');

      WidgetsFlutterBinding
          .ensureInitialized(); // Very Important to do (Reason below)

      FlutterError.demangleStackTrace = (StackTrace stack) {
        // Trace and Chain are classes in package:stack_trace
        if (stack is Trace) {
          return stack.vmTrace;
        }
        if (stack is Chain) {
          return stack.toTrace().vmTrace;
        }
        return stack;
      };

      await FirebaseConfig.instance().startup();

      runApp(const ProviderScope(child: MyApp()));
    },
  );
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final goRouter = ref.watch(goRouterProvider);
    return MaterialApp.router(
      routerConfig: goRouter,
      scaffoldMessengerKey: SnackBarService.scaffoldKey,   
      title: 'Sailbrowser',
      theme: ThemeData(
        colorSchemeSeed: const Color(0xff6750a4),
        useMaterial3: true,
      ),
    );
  }
}
