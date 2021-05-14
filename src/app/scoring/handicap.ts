/** Handicap calculation data */

import { ResultCode } from 'app/model/result-code';
import { RaceResult } from 'app/competitor/@store/competitor.model';
import { ResultsListComponent } from 'app/results/results-list/results-list.component';
import { assertExists } from 'app/utilities/misc';
import { Race } from 'app/model/race';
import { RaceSeries } from 'app/race-series/@store/race-series.model';
import { Fleet } from 'app/model/fleet';

/** Enumeration of supported handicap schemes */
export type RatingSystem = 'LEVEL_RATING' | 'RYA_PY' | 'IRC' | 'RYA_NHC';

/** Data associated with a handicap scheme */
export interface RatingSystemData {
  label: string;
  max: number;
  min: number;
}

/** Map of all possible handicap schemes */
export const ratingSystems = new Map<RatingSystem, RatingSystemData>([
  ['LEVEL_RATING', { label: 'Level Rating', max: 0, min: 0 }],
  ['RYA_PY', { label: 'PY', max: 2000, min: 500 }],
  ['IRC', { label: 'IRC', max: 3.0, min: 0.5 }],
  ['RYA_NHC', { label: 'IRC', max: 3.0, min: 0.5 }],
]);

/** Handicap value  */
export interface Handicap {
  scheme: RatingSystem;
  value: number | undefined;
}

/** Calculates the corrected time taking into account any time penalty */
function calculateResultTimes(res: RaceResult, scheme: RatingSystem, isAverageLap: boolean, startTime: string): { corrected: number, elapsed: number } {

  let result = 0;
  let elapsed = 0;

  if (res.finishTime) {

    const finish = new Date(res.finishTime).valueOf() / 1000;
    const start = new Date(startTime).valueOf() / 1000;

    elapsed = isAverageLap ? (finish - start) / res.laps : (finish - start);

    /** 20% time penalty for ZPF */
    if (res.resultCode === 'ZFP') {
      elapsed = elapsed * 1.2;
    }

    if (scheme === 'RYA_PY') {
      result = elapsed * 1000 / res.handicap;
    } else if (scheme === 'IRC' || scheme === 'RYA_NHC') {
      result = elapsed / res.handicap;
    }
  }
  return { corrected: result, elapsed: elapsed };
}

/** calculate the number of competitots in series thta have  */
function numberInSeries(): number {
  return 0
}

/**  */
function startersInRace(): number {
  return 0;
}

function finishersInRace(): number {
  return 0;
}

function sortByElapsedTime(a: RaceResult, b: RaceResult): number {
  if (a.resultCode === 'OK' && b.resultCode === 'OK') {
    return a.elapsedTime - b.elapsedTime;
  } else if (a.resultCode === 'OK' && b.resultCode !== 'OK') {
    return 1
  } else if (a.resultCode !== 'OK' && b.resultCode === 'OK') {
    return -1;
  } else { // a and b both not OK - keep sort order
    return 0
  }
}

/** Assign posiiton and point for finishers
 * competitors with the same ellapsed time will have the same position and points.
*/
function assignPointsForFinishers(results: RaceResult[]) {
  let position = 1;
  let count = 1;
  let lasttime = undefined;
  for (const res of results) {
    if (lasttime !== res.elapsedTime)
    {
      position = count;
    }
    res.position = position;
    res.points = position;

    count = count+1;
    lasttime = res.elapsedTime;
  }
}

function assignPointsForNonFinishers(results: RaceResult[]) {

}

/** Calculates positions for a single race */
export function calculateRacePositions(results: RaceResult[], race: Race, fleet: Fleet): RaceResult[] {
  // Get the fleet of the races for the handicap scheme

  let updatedResults = results.map(res => {

    const times = calculateResultTimes(res, fleet.handicapScheme, race.isAverageLap, race.actualStart);

    res.correctedTime = times.corrected;
    res.elapsedTime = times.elapsed;
    return res;
  });

  // Assign points for finishers
  results.sort((a, b) => sortByElapsedTime(a, b));
  assignPointsForFinishers(results);

  // Assign points for race-based results codes
  assignPointsForNonFinishers(results);

  return updatedResults;

}

function sortByPoints(a: RaceResult) {

}

function calculateSeries() {
  // Assign pont for series based results codes

  // Sort series results

  // Update codes dependent on
  // This includes race codes that depend on all races not just races be
}




