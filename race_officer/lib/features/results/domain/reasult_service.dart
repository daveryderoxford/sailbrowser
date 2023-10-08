import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/results/scoring/rating_system.dart';

import '../scoring/result_code_scoring.dart';

class RaceScorer {
  RaceScorer();

  /// Calculates the corrected time taking into account any time penalty.
  /// The number of laps is scaled up to the maximum number of laps 
  /// TODO - need to check rounding here.  When should I round ???
  ({Duration corrected, Duration elapsed}) calculateResultTimes(
      RaceCompetitor res,
      RatingSystem scheme,
      bool isAverageLap,
      DateTime startTime,
      int maxLaps) {

    var corrected = 0.0;
    var elapsed = 0.0;

    if (res.finishTime != null) {
      final diff = res.finishTime!.difference(startTime).inSeconds as double;

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
      corrected: Duration(seconds: corrected.toInt()),
      elapsed: Duration(seconds: elapsed.toInt())
    );
  }

  /// Return the number of starters in race taking into account result code
  int startersInRace(List<RaceCompetitor> results) {
    final res = results.fold(0, (count, comp) {
      final code = getScoringData(comp.resultCode);
      return (code!.isStartAreaComp) ? count++ : count;
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
/// Time penalities should be applied befre calling thios function
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
    const resultCode = getResultScoringData(res.resultCode);

    const code = shortSeries ? resultCode.shortSeries : resultCode.longSeries;
    const factor = shortSeries ? resultCode.shortSeriesFactor : resultCode.longSeriesFactor;

    // Assign the times
    switch (code) {
      case 'StartArea':
        res.points = starters + factor;
        break;
      case 'TimePenalty':
        // Time penality is halded by modifying the ellapsed time rather than points score
        // Question is this ciorrect - should time pemalty impact other competitots ???
        throw new Error("Check correct TimePenalty behaviour");
        break;
      case 'InSeries':
        res.points = competitorsInSeries + factor;
        break;
      case 'AvgBefore':
        break;
      case 'AvgAll':
        break;
      case 'SetByHand':
        break;
      case 'NA':

        //  NA is wither NoFinished or OK
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

  return updatedResults;

}

function sortByPoints(a: Result) {

}

function calculateSeries() {
  // Assign pont for series based results codes

  // Sort series results

  // Update codes dependent on
  // This includes race codes that depend on all races not just races be
} */
}
