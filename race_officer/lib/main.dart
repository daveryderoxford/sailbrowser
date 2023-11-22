
import 'package:clock/clock.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/snackbar_service.dart';
import 'package:sailbrowser_flutter/routing/app_router.dart';
import 'package:stack_trace/stack_trace.dart';
import 'firebase/firebase_config.dart';

/// Command line to specify that test enviroment (clock and Firebase emulator) should be used 
/// Run with dart run --define=TEST=true to configure test enviroment
const testEnviroment = bool.fromEnvironment("TEST");

Duration clockOffset = const Duration();
/// Get the clock to use for system time
/// In test mode always initialise to 15 Sept 2023 at 10:00. 
Clock getClock(bool testEnviroment) {
  if (true) {  // TODO 
    logInfo("Print using test clock,  Initialsie to 2023-09-10 (10 Sept) 10:00:00");
    if (clockOffset.inMicroseconds == 0) {
      final startTime = DateTime(2023, 09, 10, 10, 0, 0);
      clockOffset = DateTime.now().difference(startTime);
    }
    return Clock(() => DateTime.now().subtract(clockOffset));
  } else {
    const clock = Clock();
    return clock;
  }
}

main() async {
  // Initialise logging
  Loggy.initLoggy();

  withClock(
    getClock(testEnviroment),
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

      await FirebaseConfig.instance().startup(testEnviroment);

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
