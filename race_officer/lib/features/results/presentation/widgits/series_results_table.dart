import 'package:data_table_2/data_table_2.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/util/color_extensions.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

class SeriesResultsTable extends StatelessWidget {
  const SeriesResultsTable({
    super.key,
    required this.results,
  });

  final _sizeNum = 40.0;
  final _sizeResult = 40.0;

  final SeriesResults results;

  @override
  Widget build(BuildContext context) {
    final stripe1 = Theme.of(context).colorScheme.primary.tone(92);
    final stripe2 = Theme.of(context).colorScheme.primary.tone(95);
    final minWidth = 400 + results.races.length * _sizeResult;

    final format = DateFormat("mm/dd").format;

    return ResponsiveCenter(
      maxContentWidth: 800,
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: DataTable2(
          columnSpacing: 12,
          horizontalMargin: 12,
          minWidth: minWidth,
          fixedLeftColumns: 2,
          empty: const Center(
              child: Text(textScaleFactor: 1.2, 'No results to display')),
          columns: [
            DataColumn2(
              label: const Text('Pos'),
              fixedWidth: _sizeNum,
            ),
            const DataColumn2(
              label: Text('Name'),
            ),
            const DataColumn2(
              label: Text('Boat'),
              size: ColumnSize.S,
            ),
            ...results.races.map((raceResult) => DataColumn2(
                  label: Text(format(raceResult.date)),
                  fixedWidth: _sizeResult,
                )),
            DataColumn2(
              label: const Text('Total'),
              fixedWidth: _sizeNum,
            ),
            DataColumn2(
              label: const Text('Net'),
              fixedWidth: _sizeNum,
            ),
          ],
          rows: results.competitors
              .mapIndexed<DataRow>(
                (compIndex, comp) => DataRow(
                  color: MaterialStateColor.resolveWith(
                      (states) => compIndex % 2 == 1 ? stripe1 : stripe2),
                  cells: [
                    DataCell(Text(comp.position.toString())),
                    DataCell(_nameCell(context, comp)),
                    DataCell(_boatCell(context, comp)),
                    ...results.races.mapIndexed<DataCell>((raceIndex, race) =>
                        DataCell(_pointsCell(
                            context, results.results[compIndex][raceIndex]))),
                    DataCell(Text(comp.totalPoints.toString())),
                    DataCell(Text(comp.netPoints.toString())),
                  ],
                ),
              )
              .toList(),
        ),
      ),
    );
  }

  Widget _nameCell(BuildContext context, SeriesCompetitor res) {
    return Text('${res.helm}\n${res.crew}');
  }

  Widget _boatCell(BuildContext context, SeriesCompetitor res) {
    return (Text('${res.boatClass}\n${res.sailNumber}'));
  }

  Widget _pointsCell(BuildContext context, SeriesResult res) {
    final pointsStr = (res.isDiscard) ? '(${res.points})' : '${res.points}';
    final str = (res.resultCode != ResultCode.ok)
        ? '$pointsStr\n${res.resultCode}'
        : pointsStr;

    return Center(
      child: Text(str),
    );
  }
}
