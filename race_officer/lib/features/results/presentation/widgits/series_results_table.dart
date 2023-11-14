import 'package:data_table_2/data_table_2.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:loggy/loggy.dart';
import 'package:sailbrowser_flutter/common_widgets/responsive_center.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/presentation/result_controller.dart';
import 'package:sailbrowser_flutter/util/color_extensions.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

enum _RaceHeaderFormat { numOnly, dateOnly, numAndDate }

class SeriesResultsTable extends ConsumerWidget with UiLoggy {
  const SeriesResultsTable({
    super.key,
    required this.results,
  });

  final _sizePos = 40.0;
  final _sizeNum = 50.0;
  final _sizeResult = 60.0;

  final SeriesResults? results;

  /// Specify fomat for race header.
  /// If all dates are same just display race number.
  /// If all dates are different display date only
  /// If there are multiple date and races then display races of day
  _RaceHeaderFormat _getRaceHeaderFormat(List<RaceResults> races) {
    final uniqueDates = races.map((e) => e.date).toList().unique();

    if (uniqueDates.length == 1) {
      // All same date - race number only
      return _RaceHeaderFormat.numOnly;
    } else if (uniqueDates.length == races.length) {
      // One race/day date only
      return _RaceHeaderFormat.dateOnly;
    } else {
      // Otherwise date plus race number
      return _RaceHeaderFormat.numAndDate;
    }
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    if (results == null) {
      return const Center(
        child: Text(textScaleFactor: 1.2, 'No results to display'),
      );
    } else {
      final stripe1 = Theme.of(context).colorScheme.primary.tone(92);
      final stripe2 = Theme.of(context).colorScheme.primary.tone(95);
      final minWidth = 370 + results!.races.length * _sizeResult;
      final headerFormat = _getRaceHeaderFormat(results!.races);
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
              child: Text(textScaleFactor: 1.2, 'No results to display'),
            ),
            columns: [
              DataColumn2(
                label: const Text('Pos'),
                fixedWidth: _sizePos,
              ),
              const DataColumn2(
                label: Text('Name'),
              ),
              const DataColumn2(
                label: Text('Boat'),
                size: ColumnSize.S,
              ),
              ...results!.races.map((raceResult) => DataColumn2(
                  label: _raceHeading(context, raceResult, headerFormat),
                  fixedWidth: _sizeResult,
                  onSort: (index, ascending) {
                    ref
                        .read(resultsController.notifier)
                        .displayRace(raceResult);
                    DefaultTabController.of(context).animateTo(0);
                  })),
              DataColumn2(
                label: const Text('Total'),
                fixedWidth: _sizeNum,
              ),
              DataColumn2(
                label: const Text('Net'),
                fixedWidth: _sizeNum,
              ),
            ],
            rows: results!.competitors
                .mapIndexed<DataRow>(
                  (compIndex, comp) => DataRow(
                    color: MaterialStateColor.resolveWith(
                        (states) => compIndex % 2 == 1 ? stripe1 : stripe2),
                    cells: [
                      DataCell(Text(comp.position.toString())),
                      DataCell(_nameCell(context, comp)),
                      DataCell(_boatCell(context, comp)),
                      ...results!.races.mapIndexed<DataCell>(
                          (raceIndex, race) => DataCell(_racePointsCell(
                              context,
                              results!
                                  .competitors[compIndex].results[raceIndex]))),
                      DataCell(Text(_roundedPointsStr(comp.totalPoints))),
                      DataCell(Text(_roundedPointsStr(comp.netPoints))),
                    ],
                  ),
                )
                .toList(),
          ),
        ),
      );
    }
  }

  Widget _nameCell(BuildContext context, SeriesCompetitor res) {
    return Text('${res.helm}\n${res.crew}');
  }

  Widget _boatCell(BuildContext context, SeriesCompetitor res) {
    return (Text('${res.boatClass}\n${res.sailNumber}'));
  }

  String _roundedPointsStr(num points) {
    return (points.toInt() == points)
        ? points.toStringAsFixed(0)
        : points.toStringAsFixed(1);
  }

  Widget _racePointsCell(BuildContext context, SeriesResultData res) {
    var pointsStr = _roundedPointsStr(res.points);
    pointsStr = (res.isDiscard) ? '($pointsStr)' : pointsStr;

     if (res.resultCode != ResultCode.ok) {
      return Column(crossAxisAlignment: CrossAxisAlignment.center, children: [
        Text(res.resultCode.displayName),
        Text(pointsStr),
      ]);
    } else {
      return Center(child: (Text(pointsStr)));
    }
  }

  Widget _raceHeading(
      BuildContext context, RaceResults race, _RaceHeaderFormat headerFormat) {
    final month = DateFormat('MMM').format(race.date);
    final day = DateFormat('d').format(race.date);
    final index = race.index.toString();

    switch (headerFormat) {
      case _RaceHeaderFormat.dateOnly:
        return Center(child: Text('$month\n$day'));
      case _RaceHeaderFormat.numOnly:
        return Center(child: Text(index));
      case _RaceHeaderFormat.numAndDate:
        return Center(child: Text('$month\n$day\n$index'));
    }
  }
}
