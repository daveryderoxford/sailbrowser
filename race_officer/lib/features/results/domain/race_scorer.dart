import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/results/scoring/rating_system.dart';

import '../scoring/result_code_scoring.dart';

/// Functions related to calculating times and positions for an individual race.
class RaceScorer {
  RaceScorer();

  /// Calculates the corrected time taking into account any time penalty.
  /// The number of laps is scaled up to the maximum number of laps
  ({Duration corrected, Duration elapsed}) calculateResultTimes(
      RaceCompetitor res,
      RatingSystem scheme,
      bool isAverageLap,
      DateTime startTime,
      int maxLaps) {
    var corrected = 0.0;
    var elapsed = 0.0;

    if (res.finishTime != null) {
      final diff = res.finishTime!.difference(startTime).inSeconds.toDouble();

      // If start time is before finish time return defaults of zero
      if (diff < 0) {
        return (corrected: const Duration(), elapsed: const Duration());
      }

      elapsed = isAverageLap ? diff / res.numLaps * maxLaps : diff;

      switch (scheme) {
        case RatingSystem.py:
          corrected = elapsed * 1000 / res.handicap;
        case RatingSystem.irc:
          corrected = elapsed / res.handicap;
        default:
      }
    }

    return (
      // Round to nearest second rather than integer part
      corrected: Duration(seconds: corrected.round()),
      elapsed: Duration(seconds: elapsed.round())
    );
  }

  /// Return the number of starters in race taking into account result code
  int startersInRace(List<RaceCompetitor> results) {
    final res = results.fold<int>(0, (count, comp) {
      final code = getScoringData(comp.resultCode);
      return (code!.isStartAreaComp) ? count = count + 1 : count;
    });
    return res;
  }

    /// Return the number of finishers in race taking into account result code
  int finishersInRace(List<RaceCompetitor> results) {
    final res = results.fold<int>(0, (count, comp) {
      final code = getScoringData(comp.resultCode);
      return (code!.isFinishedComp) ? count = count + 1 : count;
    });
    return res;
  }

  /// Sort by corrected time taking into account resultCode
  int sortByCorrectedTime(RaceCompetitor a, b) {
    if (a.isOk && b.isOk) {
      return (a.correctedTime.inSeconds - b.correctedTime.inSeconds).toInt();
    } else if (a.isOk && !b.isOk) {
      return 1;
    } else if (!a.isOk && b.isOk) {
      return -1;
    } else {
      // a and b both not OK - keep sort order
      return 0;
    }
  }
/*
/// Assign posiiton and points for finishers
/// Competitors with the same ellapsed time get average of the two positions 
/// 
/// Time penalities should be applied befre calling this function
assignPointsForFinishers(results: Result[]) {
  let position = 1;
  let count = 1;
  let lasttime;
  for (const res of results) {
    if (lasttime !== res.elapsedTime) {
      position = count;
    }
    res.position = position;
    res.points = position;

    count = count + 1;
    lasttime = res.elapsedTime;
  }
}

assignPointsForNonFinishers(results: Result[], competitorsInSeries: number, shortSeries: boolean) {
  const starters = startersInRace(results);

  for (const res of results) {
    const resultCode = getScoringData(res.resultCode);

    const code = shortSeries ? resultCode.shortSeries : resultCode.longSeries;
    const factor = shortSeries ? resultCode.shortSeriesFactor : resultCode.longSeriesFactor;

    // Assign the times
    switch (code) {
      case 'StartArea':
        res.points = starters + factor;
      case 'scoringPenalty':
           // Scoring penalties are applied after all other positions have been determined.

        break;
      case 'InSeries':
        res.points = competitorsInSeries + factor;
      case 'AvgBefore':
          // 
          throw new Error("To Do");
        break;
      case 'AvgAll':
            throw new Error("To Do");

        break;
      case 'SetByHand':
            throw new Error("To Do");
        break;
      case 'NA':
        //  NA is either NoFinished or OK
        break;
    }

    switch
    if (resultCode.shortSeries === 'StartArea') {
      res.points = starters + resultCode.shortSeriesFactor;
    } else if (resultCode.shortSeries === 'PositionPenalty') {

    } else if

    // 'NA' | 'InSeries' | | 'AvgAll' | 'AvgBefore' | 'TimePenalty' |  | 'SetByHand';

  }
}

/// Scoring penalty appliey.  This is 20% for zfp and default of 20% for scp
/// This is applied after the points and order have been calculated.  
applyScoringPenalties() {
  // 
}

/** Calculates positions for a single race */
export function calculateRacePositions(results: Result[], race: Race, fleet: Fleet): Result[] {
  // Get the fleet of the races for the handicap scheme

  const updatedResults = results.map(res => {

    const times = calculateResultTimes(res, fleet.handicapScheme, race.isAverageLap, race.actualStart);

    res.correctedTime = times.corrected;
    res.elapsedTime = times.elapsed;
    return res;
  });

  // Assign points for race.
  results.sort((a, b) => sortByCorrectedTime(a, b));
  assignPointsForFinishers(results);
  assignPointsForNonFinishers(results);
  sortByPoints(results);
  applyScoringPenaties(results);
  handSetOverrides(results);
  sortByPoints(results);

  return updatedResults;

}

function sortByPoints(a: Result) {

}

 */
}

final raceScorerProvider = Provider((ref) => RaceScorer());
