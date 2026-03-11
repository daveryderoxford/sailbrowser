import 'package:flutter/material.dart';

class HelmCrewText extends StatelessWidget {
  const HelmCrewText({super.key, required this.helm, required this.crew});

  final String helm;
  final String? crew;

  @override
  Widget build(BuildContext context) {
    return RichText(
      text: TextSpan(
        children: [
          TextSpan(
            text: helm,
            style: DefaultTextStyle.of(context)
                .style
                .copyWith(fontWeight: FontWeight.bold),
            children: (crew == null || crew!.trim().isEmpty)
                ? <TextSpan>[]
                : <TextSpan>[
                    TextSpan(
                      text: ' / $crew',
                      style: DefaultTextStyle.of(context).style,
                    ),
                  ],
          ),
        ],
      ),
    );
  }
}
