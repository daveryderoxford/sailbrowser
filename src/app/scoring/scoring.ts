/** Race and series scoring
 */
import { Result } from 'app/competitor/@store/result.model';
import { Fleet } from 'app/model/fleet';
import { Race } from 'app/model/race';
import { assertExists } from 'app/utilities/misc';
import { exception } from 'node:console';
import { ResultCode, resultCodes, ResultScoreLike, ResultScoring } from './result-code';

export type SeriesScoringScheme = 'ISAF2017ShortSeries' | 'ISAF2017LongSeries';

/** Map of all possible handicap schemes */
export const seriesScoringScheme = new Map<SeriesScoringScheme, { label: string; description: string }>([
  ['ISAF2017ShortSeries', { label: 'Long Series', description: '' }],
  ['ISAF2017LongSeries', { label: 'Short series', description: '' }],
]);

/** Definition for discard scheme bases on number of races  */
export interface DiscardDefinition {
  initialDiscardAfter: number; /** Number of races before the first discard */
  subsequentDiscardsEveryN: number; /** Number of races sailed where a discard will apply thereafter */
}

export type OODScoringAlgorithm = 'AverageSailedRacesIncludingDiscards' | 'AverageSailedRacesExcludingDiscards';

/** Definition of scoring for OOD */
export interface OODScoring {
  algorithm: OODScoringAlgorithm;
  maxPerSeries: number;
}

export interface SeriesScoringData {
  scheme: SeriesScoringScheme;
  ood: OODScoring;
  discards: DiscardDefinition;
}

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
function calculateResultTimes(res: Result,
  scheme: RatingSystem,
  isAverageLap: boolean,
  startTime: string): { corrected: number; elapsed: number } {

  let corrected = 0;
  let elapsed = 0;

  if (res.finishTime) {

    const finish = new Date(res.finishTime).valueOf() / 1000;
    const start = new Date(startTime).valueOf() / 1000;

    elapsed = isAverageLap ? (finish - start) / res.laps : (finish - start);

    if (scheme === 'RYA_PY') {
      corrected = elapsed * 1000 / res.handicap;
    } else if (scheme === 'IRC' || scheme === 'RYA_NHC') {
      corrected = elapsed / res.handicap;
    }
  }
  return { corrected, elapsed };
}

/** calculate the number of competitots in series that have  */
function numberInSeries(): number {
  return 0;
}

/** Return the started in the race */
function startersInRace(results: Result[]): number {
  return results.reduce((count, res) => {
    const resultCodeData = getResultScoringData(res.resultCode);
    if (resultCodeData.startArea) {
      count = count + 1;
    }
    return count;
  }, 0);
}


function sortByCorrectedTime(a: Result, b: Result): number {
  if (a.resultCode === 'OK' && b.resultCode === 'OK') {
    return a.correctedTime - b.correctedTime;
  } else if (a.resultCode === 'OK' && b.resultCode !== 'OK') {
    return 1;
  } else if (a.resultCode !== 'OK' && b.resultCode === 'OK') {
    return -1;
  } else { // a and b both not OK - keep sort order
    return 0;
  }
}

/** Assign posiiton and point for finishers
 * competitors with the same ellapsed time will have the same position and points.
 */
function assignPointsForFinishers(results: Result[]) {
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

/** Returns the ResultScoring object associated with a result code, taking into account 'ScoreLike'  */
function getResultScoringData(code: ResultCode): ResultScoring {
  let resultCodeData = assertExists(resultCodes.get(code));

  // For scorelike return the resulting scoring data
  if (resultCodeData.shortSeries === 'ScoreLike') {
    const c = (resultCodeData as ResultScoreLike).scoreLike;
    resultCodeData = assertExists(resultCodes.get(c));
  }
  return resultCodeData as ResultScoring;
}

function assignPointsForNonFinishers(results: Result[], competitorsInSeries: number, shortSeries: boolean) {
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
      case 'ScoreLike':
        throw new Error("ScoreLike should be resolved to associated code here")
      default:
        throw new Error("Unexpected Result Code")
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
}
