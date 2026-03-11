import 'package:flutter/material.dart';

enum ContinueCancelResult {
  cancelOp,
  continueOp;
}

class ContinueCancelDialog extends StatelessWidget {
  const ContinueCancelDialog(
      {required this.title, required this.description, super.key});

  final String title;
  final String description;

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(title),
      content: Text(description),
      actions: <Widget>[
        TextButton(
          onPressed: () => Navigator.pop(context, ContinueCancelResult.cancelOp),
          child: const Text('Cancel'),
        ),
        TextButton(
          onPressed: () => Navigator.pop(context, ContinueCancelResult.continueOp),
          child: const Text('Continue'),
        ),
      ],
    );
  }
}
