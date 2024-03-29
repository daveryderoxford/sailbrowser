import 'package:data_table_2/data_table_2.dart';
import 'package:flutter/material.dart';
import 'package:sailbrowser_flutter/util/date_time_extensions.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/util/color_extensions.dart';
import 'package:sailbrowser_flutter/util/duration_extensions.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

class RaceResultsTable extends StatelessWidget {
  const RaceResultsTable({
    super.key,
    required this.results,
  });

  final List<RaceResult> results;

  /// Returns the row colow.
  /// This is red if there is an error in the results and stripe color otherwise.
  Color _getRowColor(int stripeIndex, String? error, BuildContext context) {
    if (error != null && error.isNotEmpty) {
      return Theme.of(context).colorScheme.errorContainer;
    }
    return stripeIndex % 2 == 1
        ? Theme.of(context).colorScheme.primary.tone(92)
        : Theme.of(context).colorScheme.primary.tone(95);
  }

  @override
  Widget build(BuildContext context) {
    return ResponsiveCenter(
      maxContentWidth: 800,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: DataTable2(
          columnSpacing: 12,
          horizontalMargin: 12,
          minWidth: 670,
          fixedLeftColumns: 2,
          empty: const Center(
              child: Text(textScaleFactor: 1.2, 'No results to display')),
          columns: const [
            DataColumn2(
              label: Text('Pos'),
              fixedWidth: 30,
            ),
            DataColumn2(
              label: Text('Name'),
              size: ColumnSize.L,
            ),
            DataColumn2(
              label: Text('Boat'),
              size: ColumnSize.L,
            ),
            DataColumn2(
              label: Text('Corrected'),
              fixedWidth: 80,
            ),
            DataColumn2(
              label: Text('Points'),
              fixedWidth: 60,
            ),
            DataColumn2(
              label: Text('Elapsed\nFinish'),
              fixedWidth: 80,
            ),
            DataColumn2(
              label: Text("H'cap\nLaps"),
              fixedWidth: 60,
            ),
            DataColumn2(
              label: Text("Notes"),
            ),
          ],
          rows: results
              .mapIndexed<DataRow>(
                (index, result) => DataRow(
                  color: MaterialStateColor.resolveWith(
                      (states) => _getRowColor(index, result.error, context)),
                  cells: [
                    DataCell(Text(result.position.toString())),
                    DataCell(_nameCell(context, result, index)),
                    DataCell(_boatCell(context, result)),
                    DataCell(Center(child: Text(result.corrected.asMinSec()))),
                    DataCell(_pointsCell(context, result)),
                    DataCell(_elapsedCell(context, result)),
                    DataCell(_hcapCell(context, result)),
                    DataCell(_notesCell(context, result)),
                  ],
                ),
              )
              .toList(),
        ),
      ),
    );
  }

  Widget _nameCell(BuildContext context, RaceResult res, int index) {
    return Text('${res.helm}\n${res.crew}');
  }

  Widget _boatCell(BuildContext context, RaceResult res) {
    return (Text('${res.boatClass}\n${res.sailNumber}'));
  }

  Widget _elapsedCell(BuildContext context, RaceResult res) {
    return Column(children: [
      Center(child: Text(res.elapsed.asMinSec())),
      if (res.finishTime != null)
        Center(child: Text(res.finishTime!.asHourMinSec())),
    ]);
  }

  Widget _pointsCell(BuildContext context, RaceResult res) {
    if (res.resultCode != ResultCode.ok) {
      return Center(
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
        Text(res.resultCode.displayName),
        Text(_roundedPointsStr(res.points)),
      ]));
    } else {
      return Center(child: (Text(_roundedPointsStr(res.points))));
    }
  }

  Widget _hcapCell(BuildContext context, RaceResult res) {
    final hCapStr = (res.handicap > 100)
        ? res.handicap.toStringAsFixed(0)
        : res.handicap.toStringAsFixed(2);
    final lapStr = (res.numLaps == 1)
        ? '${res.numLaps.toString()} lap'
        : '${res.numLaps.toString()} laps';
    return (Text('$hCapStr\n$lapStr'));
  }

  Widget _notesCell(BuildContext context, RaceResult res) {
    return (res.error == null) ? const Text('') : Text(res.error);
  }

  String _roundedPointsStr(double points) {
    return (points.toInt() == points)
        ? points.toStringAsFixed(0)
        : points.toStringAsFixed(1);
  }
}
