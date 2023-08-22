import 'package:flutter/material.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';

/// Delete  button].
/// This is displayed with a maximum width of 100% or
/// Useful for CTAs in the app.
/// @param itemName - text to display on the button.
/// @param onPressed - callback made when user has confirmed deletion.
class DeleteButton extends StatelessWidget {
  const DeleteButton(
      {super.key,
      required this.itemName,
      required this.visible,
      required this.onDelete});

  final bool visible;
  final String itemName;
  final VoidCallback onDelete;

  @override
  Widget build(BuildContext context) {
    return Visibility(
      visible: visible,
      child: ResponsiveCenter(
        maxContentWidth: 200,
        child: Padding(
          padding: const EdgeInsets.all(10.0),
          child: FilledButton(
          onPressed: () async {
            final delete = await _showDeleteDialog(context, itemName);
            if (delete!) {
              onDelete();
            }
          },
          child: const Text('Delete'),
        ),
        ),
      ),
    );
  }

  Future<bool?> _showDeleteDialog(BuildContext context, String name) {
    return showDialog<bool>(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: const Text('Delete Confirmation'),
        content: Text('Comfirm deletion of $name'),
        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            autofocus: true,
            child: const Text('Delete'),
          ),
        ],
      ),
    );
  }
}
