import 'package:flutter/material.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';

class PublishResultsDialog extends StatelessWidget {
  const PublishResultsDialog({super.key});

  @override
  Widget build(BuildContext context) {
    return SimpleDialog(
        title: const Text('Select status'),
        children: <Widget>[
          SimpleDialogOption(
            onPressed: () { Navigator.pop(context, ResultsStatus.provisional); },
            child: const Chip( label: Text('Provisional') ),
          ),
          SimpleDialogOption(
            onPressed: () { Navigator.pop(context, ResultsStatus.published); },
            child: const Chip( label: Text('Final') ),
          ),
        ],
      );
    }
}