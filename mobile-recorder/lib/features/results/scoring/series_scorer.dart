import 'package:collection/collection.dart';
import 'package:flutter/material.dart';
import 'package:meta/meta.dart';
import 'package:sailbrowser_flutter/features/race/domain/result_code.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/domain/series_results.dart';
import 'package:sailbrowser_flutter/features/results/scoring/result_code_scoring.dart';
import 'package:sailbrowser_flutter/features/results/scoring/series_scoring_data.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';

/// Functions related to calculating series points.
class SeriesScorer {
  SeriesScorer();

  SeriesResultData _createDNCSeriesComp() => SeriesResultData(
      points: 9999, resultCode: ResultCode.dns, isDiscard: false);

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

  /// Resets the series results date for a given race index
  _resetSeriesResultData(SeriesResults seriesResults, int raceIndex) {
    for (var scomp in seriesResults.competitors) {
      scomp.results[raceIndex] = _createDNCSeriesComp();
    }
  }

  /// Adds race results to the series, creating race competitors as required.
  @visibleForTesting
  addRaceResults(SeriesResults seriesResults, List<RaceResults> updatedRaces,
      SeriesEntryAlgorithm algorithm) {
    for (var race in updatedRaces) {
      _resetSeriesResultData(seriesResults, race.index);
      for (var comp in race.results!) {
        var seriesComp =
            findSeriesCompetitor(comp, seriesResults.competitors, algorithm);
        if (seriesComp == null) {
          seriesComp = SeriesCompetitor.fromRaceResult(comp);
          // List.generate generates new instances for each entry.  List.filled points to the same object.
          seriesComp.results = List.generate(
              seriesResults.races.length, (index) => _createDNCSeriesComp());
          seriesResults.competitors.add(seriesComp);
        }

        seriesComp.results[race.index] = SeriesResultData(
            points: comp.points, resultCode: comp.resultCode, isDiscard: false);
      }
    }
  }

  /// Calculate the avdrage points from  an array of races.
  /// Average of races rounded to the nearest 0.1 points.
  /// For short series, the averge of all races (including DNC is used).  Only races not finished are excluded.
  /// For long series, DNC races are excluded.
  /// In the case that no races are avaalible for calculation then DNC is scored. TODO - check assumption
  @visibleForTesting
  double averagePoints(List<SeriesResultData> results,
      SeriesScoringScheme algorithm, int maxCompetitors) {
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

  // Set points for series-dependent results codes:
  // DNC
  // Average all
  // Average before
  @visibleForTesting
  seriesDependentResultsCode(
      SeriesResults seriesResults, SeriesScoringScheme scheme) {
    for (var comp in seriesResults.competitors) {
      for (var res in comp.results) {
        final resultCode = getScoringData(res.resultCode)!;

        final algorithm = (scheme == SeriesScoringScheme.shortSeries2017)
            ? resultCode.shortSeriesAlgorithm
            : resultCode.longSeriesAlgorithm;

        switch (algorithm) {
          case ResultCodeAlgorithm.compInSeries:
            res.points = seriesResults.competitors.length + 1;
          case ResultCodeAlgorithm.avgBefore:
            //  final races = comp.results.take(comp.)  // TODO get previous races
            res.points = averagePoints(
                comp.results, scheme, seriesResults.competitors.length);
          case ResultCodeAlgorithm.avgAll:
            res.points = averagePoints(
                comp.results, scheme, seriesResults.competitors.length);
          case ResultCodeAlgorithm.setByHand ||
                ResultCodeAlgorithm.compInStartArea ||
                ResultCodeAlgorithm.scoringPenalty ||
                ResultCodeAlgorithm.na:
            break;
        }
      }
    }
  }

  @visibleForTesting
  /// Updates series result with the discards net and total points
  netPoints(SeriesResults seriesResults, int initialDiscardAfter,
      int subsequentDiscardsEveryN) {
    final numRacesSailed =
        seriesResults.races.length; // TODO - check rules for treating as a race

    final numDiscards = (numRacesSailed < initialDiscardAfter)
        ? 0
        : 1 +
            (numRacesSailed - initialDiscardAfter) ~/ subsequentDiscardsEveryN;

    for (var comp in seriesResults.competitors) {
      // Determine score to be discarded
      // toList copies the list. More efficient than copying with [...arr]
      // Note that insertionSort is stable so, for a given number of points, the first races will the ordered first
      final orderedByPoints = comp.results.toList();
      insertionSort(orderedByPoints,
          compare: (a, b) => (b.points - a.points).toInt());

      // Loop through results ordered by points/race order, setting discarded races.
      var index = 0;
      var discardCount = 0;

      while (index < orderedByPoints.length && discardCount < numDiscards) {
        final res = orderedByPoints[index];
        final algorithm = getScoringData(res.resultCode)!;
        if (algorithm.isDiscardable) {
          res.isDiscard = true;
          discardCount++;
        }
        index++;
      }

      comp.netPoints = comp.results
          .fold<double>(0.0, (sum, c) => c.isDiscard ? sum : sum + c.points);
      comp.totalPoints =
          comp.results.fold<double>(0.0, (sum, c) => sum + c.points);
    }
  }

  /// Calculate the position based on net points.
  /// TODO need to implement countback for ties.
  position(SeriesResults seriesResults) {
    seriesResults.competitors
        .sort((a, b) => (a.netPoints - b.netPoints).toInt());

    for (var (index, result) in seriesResults.competitors.indexed) {
      result.position = index + 1;
    }
  }

  /// Calculates series results based on:
  /// * Current partial series results,  List of race results.
  /// * for races where race results are supplied then updated data will replace existing races.
  calculateSeriesResults(SeriesResults seriesResults,
      List<RaceResults> updatedRaces, SeriesScoringData scoringScheme) {
    // Add race data to the series results, defining new race competitors
    addRaceResults(seriesResults, updatedRaces, scoringScheme.entryAlgorithm);

    // points for series dependent result code
    seriesDependentResultsCode(seriesResults, scoringScheme.scheme);

    // Caclulate net and total points for each competitor
    netPoints(seriesResults, scoringScheme.initialDiscardAfter,
        scoringScheme.subsequentDiscardsEveryN);

    // Order competitors and calculate position
    position(seriesResults);
  }
}
