import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

class WillPopForm extends StatelessWidget {
  const WillPopForm({super.key, required this.formKey, required this.child});
  final GlobalKey<FormBuilderState> formKey;
  final Widget child;
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
        onWillPop: () async {
          final formState = formKey.currentState;
          if (formState != null && formState.isTouched && formState.isDirty) {
            return await buildDialog(context);
          } else {
            return true;
          }
        },
        child: child);
  }

  Future<bool?> buildDialog<bool>(BuildContext context) async {
    return showDialog<bool>(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Unsaved modifications'),
            content: const Text(
                'There are unsaved modifications. /n Press Discard to discard changes or cancel to continue to edit'),
            actions: <Widget>[
              TextButton(
                style: TextButton.styleFrom(
                  textStyle: Theme.of(context).textTheme.labelLarge,
                ),
                onPressed: () => Navigator.pop(context, false),
                child: const Text('Cancel'),
              ),
              TextButton(
                style: TextButton.styleFrom(
                  textStyle: Theme.of(context).textTheme.labelLarge,
                ),
                onPressed: () => Navigator.pop(context, true),
                child: const Text('Discard Changes'),
              ),
            ],
          );
        });
  }
}
