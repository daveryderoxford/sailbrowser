import 'package:flutter/material.dart';

class SailNumber extends StatelessWidget {
  const SailNumber({required this.num, super.key});

  final int num;

  @override
  Widget build(BuildContext context) {
    final s = num.toString();
    if (s.length < 4) {
      return Text(s);
    } else {
      final firstDigits = s.substring(0, s.length - 3);
      final lastDigits = s.substring(s.length - 3);
      return RichText(
        text: TextSpan(
          children: [
            TextSpan(
              text: firstDigits,
              style: DefaultTextStyle.of(context).style,
              children: <TextSpan>[
                TextSpan(
                  text: lastDigits,
                  style: const TextStyle(
                      color: Colors.red, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ],
        ),
      );
    }
  }
}
