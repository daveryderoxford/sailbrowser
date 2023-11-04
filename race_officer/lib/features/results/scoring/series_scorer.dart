import 'package:flutter/material.dart';
import 'package:meta/meta.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/scoring/result_code_scoring.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scoring_data.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

/// Functions related to calculating series points.
class SeriesScorer {
  SeriesScorer();

  /// Finds is a race competitor is present in series.
  @visibleForTesting
  SeriesCompetitor? findSeriesCompetitor(RaceResult raceComp,
      List<SeriesCompetitor> seriesComps, SeriesEntryAlgorithm algorithm) {
    return seriesComps.firstWhereOrNull((seriesComp) {
      switch (algorithm) {
        case SeriesEntryAlgorithm.classSailNumber:
          return seriesComp.boatClass == raceComp.boatClass &&
              seriesComp.sailNumber == raceComp.sailNumber;

        case SeriesEntryAlgorithm.classSailNumberHelm:
          return seriesComp.helm == raceComp.helm &&
              seriesComp.boatClass == raceComp.boatClass &&
              seriesComp.sailNumber == raceComp.sailNumber;

        case SeriesEntryAlgorithm.helm:
          return seriesComp.helm == raceComp.helm;
      }
    });
  }

  /// Adds race results to the series, creating race competitors as required.
  @visibleForTesting
  addRaceResults(SeriesResults seriesResults, List<RaceResults> updatedRaces,
      SeriesEntryAlgorithm algorithm) {
    for (var race in updatedRaces) {
      for (var comp in race.results!) {
        var seriesComp =
            findSeriesCompetitor(comp, seriesResults.competitors, algorithm);
        if (seriesComp == null) {
          seriesComp = SeriesCompetitor.fromRaceResult(comp);
          seriesComp.results = List.filled(
            seriesResults.races.length,
            SeriesResultData(
                points: 9999, resultCode: ResultCode.dns, isDiscard: false),
          );
          seriesResults.competitors.add(seriesComp);
        }

        seriesComp.results[race.index] = SeriesResultData(
            points: comp.points, resultCode: comp.resultCode, isDiscard: false);
      }
    }
  }

  /// calculate the averge of an array of
  /// Average of races rounded to the nearest 0.1 points.
  /// For short series, the averge of all races (including DNC is used).  Only races not finished are excluded.
  /// For long series, DNC races are excluded.
  /// In the case that no races are avaalible for calculation then DNC is scored. TODO - check assumption
  @visibleForTesting
  double averagePoints(
      List<SeriesResultData> results, SeriesScoringScheme algorithm, int maxCompetitors) {
    final comps = (algorithm == SeriesScoringScheme.shortSeries2017)
        ? results.where((comp) =>
                (comp.resultCode != ResultCode.notFinished) &&
                (comp.resultCode != ResultCode.ood) &&
                (comp.resultCode != ResultCode.rdga) && // Average all
                (comp.resultCode != ResultCode.rdgb) // Average before
            )
        : results.where(
            (comp) =>
                (comp.resultCode != ResultCode.dns) &&
                (comp.resultCode != ResultCode.notFinished) &&
                (comp.resultCode != ResultCode.rdga) && // Average all
                (comp.resultCode != ResultCode.rdgb) && // Average before
                (comp.resultCode != ResultCode.ood),
          );

    var avg = (comps.isEmpty)
        ? maxCompetitors + 1.0
        : comps.fold(0.0, (sum, comp) => comp.points) / comps.length;
    avg = ((avg * 10.0).round as double) / 10.0;
    return avg;
  }

  // Set points for series dependent results codes:
  // DNC
  // Average all
  // Average before
  @visibleForTesting
  seriesDependentResultsCode(
      List<SeriesResults> seriesResults, SeriesScoringScheme scheme) {
    for (var series in seriesResults) {
      for (var comp in series.competitors) {
        for (var res in comp.results) {
          final resultCode = getScoringData(res.resultCode)!;

          final algorithm = (scheme == SeriesScoringScheme.shortSeries2017)
              ? resultCode.shortSeriesAlgorithm
              : resultCode.longSeriesAlgorithm;

          switch (algorithm) {
            case ResultCodeAlgorithm.compInSeries:
              res.points = series.competitors.length + 1;
            case ResultCodeAlgorithm.avgBefore:
             //  final races = comp.results.take(comp.)  //TODO get previous races
              res.points = averagePoints(comp.results, scheme, series.competitors.length);
            case ResultCodeAlgorithm.avgAll:
              res.points = averagePoints(comp.results, scheme, series.competitors.length);
            case ResultCodeAlgorithm.setByHand ||
                  ResultCodeAlgorithm.compInStartArea ||
                  ResultCodeAlgorithm.scoringPenalty ||
                  ResultCodeAlgorithm.na:
              break;
          }
        }
      }
    }
  }

  /// Calculates series results based on:
  /// * Current partial series results,  List of race results.
  /// * for races where race results are supplied then updated data will replace existing races.
 calculateSeriesResults(SeriesResults seriesResults,
      List<RaceResults> updatedRaces, Series series) {
    // Add race data to the series results, defining new race competitors
    addRaceResults(
        seriesResults, updatedRaces, series.scoringScheme.entryAlgorithm);

    // points for series dependent
    //
    // Identify discards
    // Order by points
  }
}
