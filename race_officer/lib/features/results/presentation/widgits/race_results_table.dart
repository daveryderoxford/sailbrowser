import 'package:data_table_2/data_table_2.dart';
import 'package:flutter/material.dart';
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

  @override
  Widget build(BuildContext context) {
    final stripe1 = Theme.of(context).colorScheme.primary.tone(92);
    final stripe2 = Theme.of(context).colorScheme.primary.tone(95);

    return ResponsiveCenter(
      maxContentWidth: 800,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: DataTable2(
          columnSpacing: 12,
          horizontalMargin: 12,
          minWidth: 600,
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
              label: Text('Elapsed\nFinish'),
              fixedWidth: 100,
            ),
            DataColumn2(
              label: Text('Corrected'),
              fixedWidth: 100,
            ),
            DataColumn2(
              label: Text('Points'),
              fixedWidth: 50,
            ),
            DataColumn2(
              label: Text("H'cap\nLaps"),
              fixedWidth: 50,
            ),
          ],
          rows: results
              .mapIndexed<DataRow>(
                (index, result) => DataRow(
                    color: MaterialStateColor.resolveWith(
                        (states) => index % 2 == 1 ? stripe1 : stripe2),
                    cells: [
                      DataCell(Text(result.position.toString())),
                      DataCell(_nameCell(context, result, index)),
                      DataCell(_boatCell(context, result)),
                      DataCell(Center(child: Text(result.elapsed.asMinSec()))),
                      DataCell(
                          Center(child: Text(result.corrected.asMinSec()))),
                      DataCell(_pointsCell(context, result)),
                      DataCell(_hcapCell(context, result)),
                    ]),
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

  Widget _pointsCell(BuildContext context, RaceResult res) {
    if (res.resultCode != ResultCode.ok) {
      return Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
        Text(res.resultCode.displayName),
        Text(_roundedPointsStr(res.points)),
      ]);
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

  String _roundedPointsStr(double points) {
    return (points.toInt() == points)
        ? points.toStringAsFixed(0)
        : points.toStringAsFixed(1);
  }
}
