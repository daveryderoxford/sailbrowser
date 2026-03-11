
import 'package:flutter/widgets.dart';

/// Null widget used when we do not want to render any content
class NullWidget extends StatelessWidget {
  const NullWidget({super.key});
  
  @override
  Widget build(BuildContext context) {
    return const SizedBox.shrink();
  }

}