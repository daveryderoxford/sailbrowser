import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sailbrowser_flutter/features/race-calander/domain/series.dart';
import 'package:sailbrowser_flutter/features/race/domain/race_competitor.dart';
import 'package:sailbrowser_flutter/features/results/domain/race_result.dart';
import 'package:sailbrowser_flutter/features/results/scoring/rating_system.dart';
import 'package:sailbrowser_flutter/util/list_extensions.dart';
import 'package:meta/meta.dart';

import 'result_code_scoring.dart';

/// Functions related to calculating times and positions for an individual race.
class RaceScorer {
  RaceScorer();

  @visibleForTesting
  int maxLaps(List<RaceCompetitor> competitors) {
    return competitors.fold(
        0, (max, comp) => (comp.numLaps > max) ? comp.numLaps : max);
  }

  /// Calculates the corrected time taking into account any time penalty.
  /// The number of laps is scaled up to the maximum number of laps
  @visibleForTesting
  ({Duration corrected, Duration elapsed, String error}) calculateResultTimes(
      {required RaceCompetitor comp,
      required HandicapScheme scheme,
      required bool isAverageLap,
      required DateTime startTime,
      required int maxLaps}) {
    var corrected = 0.0;
    var elapsed = 0.0;

    if (comp.finishTime != null && comp.startTime != null) {
      final diff = comp.finishTime!.difference(startTime).inSeconds.toDouble();

      // If start time is before finish time return defaults of zero
      if (diff < 0) {
        return (corrected: const Duration(), elapsed: const Duration(), error: 'Start time before finish time');
      }

      if (isAverageLap && (comp.numLaps == 0)) {
        return (corrected: const Duration(), elapsed: const Duration(), error: 'Number of laps 0 for average lap race');
      } 

      elapsed = isAverageLap ? diff / comp.numLaps * maxLaps : diff;

      switch (scheme) {
        case HandicapScheme.py:
          corrected = elapsed * 1000.0 / comp.handicap;
        case HandicapScheme.irc:
          corrected = elapsed / comp.handicap;
        case HandicapScheme.levelRating:
          corrected = elapsed;
      } 
    } else {
      return (corrected: const Duration(), elapsed: const Duration(), error: '');
    }

    return (
      // Round to nearest second rather than integer part
      corrected: Duration(seconds: corrected.round()),
      elapsed: Duration(seconds: elapsed.round()),
      error: ''
    );
  }

  /// Return the number of starters in race taking into account result code
  @visibleForTesting
  int startersInRace(List<RaceResult> results) {
    final res = results.fold<int>(0, (count, comp) {
      final code = getScoringData(comp.resultCode);
      return (code!.isStartAreaComp) ? count = count + 1 : count;
    });
    return res;
  }

  /// Return the number of finishers in race taking into account result code
  @visibleForTesting
  int finishersInRace(List<RaceResult> results) {
    final res = results.fold<int>(0, (count, comp) {
      final code = getScoringData(comp.resultCode);
      return (code!.isFinishedComp) ? count = count + 1 : count;
    });
    return res;
  }

  /// Sort by corrected time taking into account resultCode
  @visibleForTesting
  int sortByCorrectedTime(RaceResult a, b) {
    if (a.isOk && b.isOk) {
      return (a.corrected.inSeconds - b.corrected.inSeconds).toInt();
    } else if (a.isOk && !b.isOk) {
      return 1;
    } else if (!a.isOk && b.isOk) {
      return -1;
    } else {
      // a and b both not OK - keep existing order
      return 0;
    }
  }

  /// Assign posiiton and points for finishers
  /// Competitors with the same ellapsed time get average of the two positions.
  /// This funciton assumes that the competitor list is sorted into corrected time order
  @visibleForTesting
  assignPointsForFinishers(List<RaceResult> results) {
    /// Group competitors by their finish time
    final resultsByTime = results.groupBy((res) => res.corrected);

    var times = resultsByTime.keys.toList();
    times.sort(); // Map does not garantee order of keys

    var pos = 1.0;
    var updated = <RaceResult>[];

    for (var time in times) {
      var resultsAtTime = resultsByTime[time]!;
      if (resultsAtTime.length == 1) {
        updated.add(
            resultsAtTime[0].copyWith(position: pos.toString(), points: pos));
      } else {
        var posStr = '$pos=';
        var avgPoints = pos - 1 + (resultsAtTime.length + 1) / 2;
        for (var res in resultsAtTime) {
          updated.add(res.copyWith(position: posStr, points: avgPoints));
        }
        pos = pos + resultsAtTime.length;
      }
    }
    return pos;
  }

  /// Assigns points for non-finishers depending on race data.
  /// Result codes depending on competitors in the series will be determined when
  /// series points are calculated.
  @visibleForTesting
  assignPointsForNonFinishers(List<RaceResult> results, bool shortSeries) {
    var starters = -1; // Lazily calculated

    for (var res in results) {
      final resultCode = getScoringData(res.resultCode)!;

      final algorithm = shortSeries
          ? resultCode.shortSeriesAlgorithm
          : resultCode.longSeriesAlgorithm;

      // Assign the times
      switch (algorithm) {
        case ResultCodeAlgorithm.compInStartArea:
          // Lazily initialise starters as an optimisation in case the code is not used.
          if (starters == -1) {
            starters = startersInRace(results);
          }
          res.points = starters + 1.0;
        case ResultCodeAlgorithm.scoringPenalty:
        // TODO Scoring penalties are applied after all other positions have been determined - so require a second loop (zpf/scp)
        case ResultCodeAlgorithm.compInSeries:
        case ResultCodeAlgorithm.avgBefore:
        case ResultCodeAlgorithm.avgAll:
        case ResultCodeAlgorithm.na:
          break;
        case ResultCodeAlgorithm.setByHand:
          throw Error.safeToString(
              "Set by hand handled part of series scoring");
          //  NA is either NoFinished or OK
          break;
      }
    }
  }

  /// Scoring penalty applied.  This is 20% for zfp and default of 20% for scp
  /// This is applied after the points and order have been calculated.
  /// It can not be larger than the number of  
  @visibleForTesting
  applyScoringPenalties() {
    //
  }

  /// Calculates positions for a list of race competitors.
  /// Returns a list of race results ordered by points.
  List<RaceResult> calculateRaceResults(
      List<RaceCompetitor> competitors, HandicapScheme scheme, Race race) {
    final laps = maxLaps(competitors);

    final results = competitors.map((comp) {
      final times = calculateResultTimes(
          comp: comp,
          scheme: scheme,
          isAverageLap: race.isAverageLap,
          startTime: comp.startTime!,
          maxLaps: laps);

      final res = RaceResult(
        helm: comp.helm,
        crew: comp.crew,
        boatClass: comp.boatClass,
        sailNumber: comp.sailNumber,
        finishTime: comp.finishTime,
        position: '0',
        points: 0,
        resultCode: comp.resultCode,
        elapsed: times.elapsed,
        corrected: times.corrected,
        error: times.error,
        numLaps: comp.numLaps, 
      );
      return res;
    }).toList();

    // Assign points for race.
    results.sort((a, b) => sortByCorrectedTime(a, b));

    assignPointsForFinishers(results);

    assignPointsForNonFinishers(results, false);
    // sortByPoints(results);
    // results = applyScoringPenaties(results);
    // handSetOverrides(res);
    // sortByPoints(results);

    return results;
  }
}

final raceScorerProvider = Provider((ref) {
  return RaceScorer();
});
