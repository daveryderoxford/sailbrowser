import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/routing/app_router.dart';
import 'package:stack_trace/stack_trace.dart';
import 'firebase/firebase_config.dart';

main() async {

  // Initialise logging
  Loggy.initLoggy();

  WidgetsFlutterBinding.ensureInitialized(); // Very Important to do (Reason below)
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

  runApp(const ProviderScope( child: MyApp()));
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final goRouter = ref.watch(goRouterProvider);
    return MaterialApp.router(
      routerConfig: goRouter,
      title: 'Sailbrowser',
      theme: ThemeData(
        colorSchemeSeed: const Color(0xff6750a4),
        useMaterial3: true,
      ),
    );
  }
}
