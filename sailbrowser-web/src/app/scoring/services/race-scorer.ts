import { RaceResult } from 'app/published-results/model/published-race';
import { Race } from '../../race-calender/model/race';
import { RaceCompetitor } from '../../results-input/model/race-competitor';
import { HandicapSystem } from 'app/scoring/model/handicap-system';
import { isFinishedComp, isStarter } from 'app/scoring/model/result-code';
import { differenceInSeconds } from 'date-fns';
import { SeriesScoringScheme } from '../model/scoring-algotirhm';

interface IntermediateResult extends RaceResult {
  // Internal properties for scoring
  position: number;
  isDiscardable: boolean;
}

/**
 * Uses competitor start, finish. lap and status to calculate results for a single race. 
 * All data in the ResultsData object is populated (elapsed/corrected times points and positions).
 * 
 * It is assumes all competitors in the race are supplied. 
 * The maximum number of laps and number of starters is calculated based on all competitors. 
 */
export function scoreRace(
  competitors: RaceCompetitor[],
  scheme: HandicapSystem,
  race: Race,
  seriesType: SeriesScoringScheme,
  seriesCompetitorCount: number,
): RaceResult[] {

  const isPositionBased = race.type === 'Pursuit' || scheme === 'Level Rating';

  return isPositionBased
    ? scoreByPosition(competitors, race, seriesType, seriesCompetitorCount)
    : scoreByTime(competitors, scheme, race, seriesType, seriesCompetitorCount);
}

/**
 * Calculates results for a time-based handicap race (e.g., PY).
 */
function scoreByTime(
  competitors: RaceCompetitor[],
  scheme: HandicapSystem,
  race: Race,
  seriesType: SeriesScoringScheme,
  seriesCompetitorCount: number,
): RaceResult[] {

  // 1. Calculate the maximum number of laps.
  const maxLaps = competitors.reduce((max, comp) => (comp.numLaps > max) ? comp.numLaps : max, 0);

  // 2. Build initial results
  const intermediateResults = buildIntermediateResults(competitors, scheme, race, maxLaps);

  // 2. Sort by corrected time (taking into account result code)
  intermediateResults.sort((a, b) => sortByCorrectedTime(a, b));

  // 3. Assign points for finishers
  assignPointsForFinishers(intermediateResults, 'correctedTime');

  // 4. Assign points for non-finishers
  assignPointsForNonFinishers(intermediateResults, seriesCompetitorCount);

  // 5. Sort by points to determine final positions
  intermediateResults.sort((a, b) => sortByPoints(a, b));

  // 6. Apply scoring penalties
  applyScoringPenalties(intermediateResults, seriesType);

  // 7. Re-sort if penalties changed order
  intermediateResults.sort((a, b) => sortByPoints(a, b));

  // 8. Remove internal properties before returning
  return intermediateResults.map(({ position, isDiscardable, ...result }) => result);
}

/**
 * Calculates results for a position-based race (Level Rating or Pursuit).
 */
function scoreByPosition(
  competitors: RaceCompetitor[],
  race: Race,
  seriesType: SeriesScoringScheme,
  seriesCompetitorCount: number,
): RaceResult[] {

  // For position-based races, maxLaps is not used for scoring, so pass 0.
  const intermediateResults = buildIntermediateResults(competitors, 'Level Rating', race, 0);

  if (race.type === 'Pursuit') {
    // For Pursuit races, position is manually entered.
    intermediateResults.forEach((res, i) => {
      res.position = competitors[i].manualPosition || 0;
    });
  } else {
    // For other position-based races (like Level Rating), sort by corrected time first.
    intermediateResults.sort((a, b) => sortByCorrectedTime(a, b));
    intermediateResults.forEach((res, index) => {
      res.position = index + 1;
    });
  }

  // 1. Assign points based on manual position for finishers
  assignPointsForFinishers(intermediateResults.filter(res => res.position > 0), 'position');

  // 2. Assign points for non-finishers
  assignPointsForNonFinishers(intermediateResults, seriesCompetitorCount);

  // 3. Sort by points to determine final positions
  intermediateResults.sort((a, b) => sortByPoints(a, b));

  // 4. Apply scoring penalties
  applyScoringPenalties(intermediateResults, seriesType);

  // 5. Re-sort if penalties changed order
  intermediateResults.sort((a, b) => sortByPoints(a, b));

  // 6. Finalize position based on points for official record
  intermediateResults.forEach((res, index) => {
    res.position = index + 1;
  });

  // 7. Remove internal properties before returning
  return intermediateResults.map(({ position, isDiscardable, ...result }) => result);
}

function buildIntermediateResults(
  competitors: RaceCompetitor[],
  scheme: HandicapSystem,
  race: Race,
  maxLaps: number
): IntermediateResult[] {
  return competitors.map((comp) => {
    const times = getCorrectedTime(comp, scheme, race.isAverageLap, maxLaps);
    return {
      boatClass: comp.boatClass,
      sailNumber: comp.sailNumber,
      helm: comp.helm,
      crew: comp.crew,
      laps: comp.numLaps,
      handicap: comp.handicap,
      startTime: comp.startTime!,
      finishTime: comp.finishTime!,
      elapsedTime: times.elapsed,
      correctedTime: times.corrected,
      points: 0,
      resultCode: comp.resultCode,
      position: 0,
      isDiscardable: true,
    };
  });
}

function getCorrectedTime(comp: RaceCompetitor, scheme: HandicapSystem, isAverageLap: boolean, maxLaps: number): { corrected: number; elapsed: number; error: string; } {

  let corrected = 0.0;
  let elapsed = 0.0;

  const finishTime = comp.finishTime;
  const compStartTime = comp.startTime;

  if (finishTime && compStartTime) {

    const diff = differenceInSeconds(finishTime.getTime(), compStartTime.getTime());

    if (diff < 0) {
      return { corrected: 0, elapsed: 0, error: 'Start time before finish time' };
    }

    const numLaps = comp.numLaps;
    if (isAverageLap && numLaps === 0) {
      return { corrected: 0, elapsed: 0, error: 'Number of laps 0 for average lap race' };
    }

    elapsed = diff;

    const correctedElapsed = isAverageLap ? (elapsed / numLaps) * maxLaps : elapsed;

    switch (scheme) {
      case 'PY':
        corrected = (correctedElapsed * 1000.0) / comp.handicap;
        break;
      case 'Level Rating':
        corrected = diff; // For Level Rating, corrected time is the same as elapsed.
        break;
    }
  } else {
    return { corrected: 0, elapsed: 0, error: '' };
  }

  return {
    corrected: Math.round(corrected),
    elapsed: Math.round(elapsed),
    error: '',
  };
}

/** Assigns points for finishers in a race
 * Competitors with the same value for the given key (e.g., correctedTime or position)
 * are awarded tied points.
 */
function assignPointsForFinishers(results: IntermediateResult[], key: keyof IntermediateResult) {
  const finishers = results.filter((res) => isFinishedComp(res.resultCode));
  const resultsByValue = new Map<number, IntermediateResult[]>();

  // Group competitors by the value of the specified key
  finishers.forEach((res) => {
    const value = (res[key] as number) || 0;
    if (!resultsByValue.has(value)) resultsByValue.set(value, []);
    resultsByValue.get(value)!.push(res);
  });

  // Iterate over ordered list of values, calculating points for ties
  const sortedValues = Array.from(resultsByValue.keys()).sort((a, b) => a - b);
  let pos = 1.0;

  for (const value of sortedValues) {
    const resultsAtValue = resultsByValue.get(value)!;
    // The average points for a group of tied competitors is the average of the positions they would have taken.
    // For example, if 2 boats tie for 2nd, they take up positions 2 and 3, so they both get (2+3)/2 = 2.5 points.
    const avgPoints = pos - 1 + (resultsAtValue.length + 1) / 2.0;

    for (const res of resultsAtValue) {
      res.points = avgPoints;
      res.position = pos;
    }
    pos += resultsAtValue.length;
  }
}

function assignPointsForNonFinishers(results: IntermediateResult[], seriesCompetitorCount: number) {
  let starters = -1;

  for (const res of results) {
    if (isFinishedComp(res.resultCode)) continue;

    if (isStarter(res.resultCode)) {
      if (starters === -1) starters = startersInRace(results);
      res.points = starters + 1.0;
      res.position = starters + 1;
    } else {
      res.points = seriesCompetitorCount + 1.0;
      res.position = seriesCompetitorCount + 1;
    }
  }
}

function applyScoringPenalties(results: IntermediateResult[], scheme: SeriesScoringScheme) {
  for (const res of results) {
    if (res.resultCode === 'SCP') {
      res.points = Math.min(res.points * 1.2, 99999);
    }
  }
}

function sortByPoints(a: IntermediateResult, b: IntermediateResult): number {
  return (a.points || 9999) - (b.points || 9999);
}

function startersInRace(results: IntermediateResult[]): number {
  return results.reduce((count, comp) => {
    return isStarter(comp.resultCode) ? count + 1 : count;
  }, 0);
}

function isOk(comp: IntermediateResult): boolean {
  return comp.resultCode === 'OK';
}

export function sortByCorrectedTime(a: IntermediateResult, b: IntermediateResult): number {
  const aOk = isOk(a);
  const bOk = isOk(b);

  if (aOk && bOk) {
    return (a.correctedTime || 0) - (b.correctedTime || 0);
  } else if (aOk && !bOk) {
    return -1;
  } else if (!aOk && bOk) {
    return 1;
  } else {
    return 0;
  }
}