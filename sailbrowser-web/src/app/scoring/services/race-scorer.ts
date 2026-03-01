import { PublishedRace, RaceResult } from 'app/published-results/model/published-race';
import { HandicapSystem } from 'app/scoring/model/handicap-system';
import { getLongAlgorithm, getShortAlgorithm, isFinishedComp, isStartAreaComp, ResultCodeAlgorithm } from 'app/scoring/model/result-code-scoring';
import { differenceInSeconds } from 'date-fns';
import { Race } from '../../race-calender/model/race';
import { RaceCompetitor } from '../../results-input/model/race-competitor';
import { SeriesScoringScheme } from '../model/scoring-algotirhm';
import { SailbrowserError } from 'app/shared/utils/sailbrowser-error'

interface IntermediateResult extends RaceResult {
  // Internal properties for scoring
  position: number;
  isDiscardable: boolean;
}

/**
 * Uses competitor start, finish. lap and status to calculate results for a single race. 
 * All data in the ResultsData object is populated (elapsed/corrected times points and positions).
 * 
 * Assumes all competitors in the race are supplied.  
 * The maximum number of laps and number of starters is calculated based on all competitors. 
 */
export function scoreRace(
  race: Race,
  competitors: RaceCompetitor[],
  scheme: HandicapSystem,
  seriesType: SeriesScoringScheme,
  seriesCompetitorCount: number,
): RaceResult[] {

  // 1. Build initial results, including calculated elapsed and corrected times.
  const maxLaps = competitors.reduce((max, comp) => (comp.numLaps > max) ? comp.numLaps : max, 0);
  const intermediateResults = buildIntermediateResults(competitors, scheme, race, maxLaps);

  // 2. Determine the ordering property for finishers.
  const orderingProperty = determineOrdering(race, scheme, intermediateResults);
  // Sort all results to establish finishing order (finishers first, then by ordering property).
  intermediateResults.sort((a, b) => sortByFinishingOrder(a, b, orderingProperty));

  // 3. Assign points to finishers based on their sorted order.
  assignPointsForFinishers(intermediateResults, orderingProperty, seriesType, seriesCompetitorCount);

  // 4. Assign points for non-finishers (DNF, OCS, etc.).
  applyStaticRacePenalties(intermediateResults, seriesCompetitorCount, seriesType);

  // 5. Sort all competitors by points to determine final race ranks.
  intermediateResults.sort((a, b) => sortByPoints(a, b));

  // 4. Remove internal properties before returning
  return intermediateResults.map(({ position, isDiscardable, ...result }, index) => {
    return { ...result, rank: index + 1 };
  });
}

/**
 * Determines the property to sort finishers by and validates that all finishers have the required data.
 * 1. If Pursuit -> position.
 * 2. If Level Rating -> if manualPositions -> position, else elapsedTime.
 * 3. Handicap -> correctedTime.
 * 4. Checks that all finishers have a value for the ordering property.
 */
function determineOrdering(race: Race, scheme: HandicapSystem, results: IntermediateResult[]): keyof IntermediateResult {
  let orderingProperty: keyof IntermediateResult;
  const finishers = results.filter(res => isFinishedComp(res.resultCode));

  if (race.type === 'Pursuit') {
    orderingProperty = 'position';
    validateFinishersHaveData(finishers, 'position', 'Pursuit races require a manual position');
  } else if (scheme === 'Level Rating') {
    const useManualPositions = finishers.some(f => f.position > 0);
    if (useManualPositions) {
      orderingProperty = 'position';
      validateFinishersHaveData(finishers, 'position', 'Manual positions are used');
    } else {
      orderingProperty = 'elapsedTime';
      validateFinishersHaveData(finishers, 'elapsedTime', 'Finish times are used');
    }
  } else { // Handicap race
    orderingProperty = 'correctedTime';
    // For handicap races, a corrected time of 0 implies missing finish time, which is an error for a finisher.
    validateFinishersHaveData(finishers, 'correctedTime', 'Handicap races require a finish time');
  }
  return orderingProperty;
}

/**
 * Checks that all finishers have a valid (non-zero) value for the specified ordering property.
 * Throws a SailbrowserError if any finisher is missing data.
 */
function validateFinishersHaveData(finishers: IntermediateResult[], property: keyof IntermediateResult, context: string) {
  const missingData = finishers.find(f => !((f[property] as number) > 0));
  if (missingData) {
    const propertyName = property === 'position' ? 'position' : 'finish time';
    throw new SailbrowserError(`Inconsistent ordering data: ${context}, but finisher with sail number ${missingData.sailNumber} is missing a ${propertyName}.`);
  }
}

/**
 * Re-calculates points for a previously scored race. This is necessary when the
 * total number of competitors in a series changes, affecting DNC/DNS scores.
 * It modifies the points for non-finishers directly on the provided race object.
 */
export function rescoreRacePoints(
  race: PublishedRace,
  newSeriesCompetitorCount: number,
  seriesType: SeriesScoringScheme
): PublishedRace {
  // Create a mutable copy of the results to work with.
  const results: IntermediateResult[] = race.results.map(r => ({ ...r, position: r.rank, isDiscardable: race.isDiscardable }));

  // Re-assign points for non-finishers based on the new total competitor count.
  applyStaticRacePenalties(results, newSeriesCompetitorCount, seriesType);

  return { ...race, results: results.map(({ position, isDiscardable, ...result }) => result) };
}

function buildIntermediateResults(
  competitors: RaceCompetitor[],
  scheme: HandicapSystem,
  race: Race,
  maxLaps: number
): IntermediateResult[] {
  return competitors.map((comp) => {
    const elapsedTime = getElapsedTime(comp, race.isAverageLap, maxLaps);
    return {
      rank: 0,
      boatClass: comp.boatClass,
      sailNumber: comp.sailNumber,
      helm: comp.helm,
      crew: comp.crew,
      laps: comp.numLaps,
      handicap: comp.handicap,
      startTime: comp.startTime!,
      finishTime: comp.finishTime!,
      elapsedTime: elapsedTime,
      correctedTime: calculateCorrectedTime(elapsedTime, comp.handicap, scheme),
      points: 0,
      resultCode: comp.resultCode,
      position: comp.manualPosition || 0,
      isDiscardable: true,
    };
  });
}

function getElapsedTime(comp: RaceCompetitor, isAverageLap: boolean, maxLaps: number): number {
  const finishTime = comp.finishTime;
  const compStartTime = comp.startTime;

  if (finishTime && compStartTime) {
    const diff = differenceInSeconds(finishTime.getTime(), compStartTime.getTime());

    if (diff < 0) {
      // Consider logging this error
      return 0;
    }

    const numLaps = comp.numLaps;
    if (isAverageLap && numLaps === 0) {
      // Consider logging this error
      return 0;
    }

    const elapsedTime = isAverageLap ? (diff / numLaps) * maxLaps : diff;
    return Math.round(elapsedTime);
  }
  return 0;
}

function calculateCorrectedTime(elapsedTime: number, handicap: number, scheme: HandicapSystem): number {
  if (elapsedTime === 0) {
    return 0;
  }
  switch (scheme) {
    case 'PY':
      return Math.round((elapsedTime * 1000.0) / handicap);
    case 'Level Rating':
      return elapsedTime; // No handicap correction
    case 'IRC':
    case 'Personal':
      throw new SailbrowserError(`${scheme} Not implemented`);
  }
}

/** Assigns points based on the competitor's ellapsed/corrected time.
 * Competitors with the same value for the given key (e.g., correctedTime or position)
 * are awarded tied points.  
 * When multiple competitors are tied, the score is rounded to 1 decimal place. 
 * Scoring penalty codes are included and the scoting penatly applied 
 */
function assignPointsForFinishers(
  results: IntermediateResult[],
  key: keyof IntermediateResult,
  seriesType: SeriesScoringScheme,
  seriesCompetitorCount: number,
) {
  const finishers = results.filter((res) => isFinishedComp(res.resultCode));
  const resultsByValue = new Map<number, IntermediateResult[]>();

  // Group competitors by the value of the specified key
  for (const res of finishers) {
    const value = (res[key] as number) || 0;
    // A value of 0 is used for null for time/position, so we don't want to treat it as falsey.
    if (value === 0 && res.resultCode !== 'OK') continue;
    if (!resultsByValue.has(value)) resultsByValue.set(value, []);
    resultsByValue.get(value)!.push(res);
  }

  // Iterate over ordered list of values, calculating points for ties
  const sortedValues = Array.from(resultsByValue.keys()).sort((a, b) => a - b);
  let pos = 1.0;

  const startAreaCount = results.filter(r => isStartAreaComp(r.resultCode)).length;
  const dnfPoints = (seriesType === 'longSeries2017' ? startAreaCount : seriesCompetitorCount) + 1;

  for (const value of sortedValues) {
    const resultsAtValue = resultsByValue.get(value)!;
    // The average points for a group of tied competitors is the average of the positions they would have taken.
    // For example, if 2 boats tie for 2nd, they take up positions 2 and 3, so they both get (2+3)/2 = 2.5 points.
    const avgPoints = pos - 1 + (resultsAtValue.length + 1) / 2.0;

    for (const res of resultsAtValue) {
      // Round ties to one decimal place 
      res.points = Math.round(avgPoints * 10) / 10;
      res.position = pos;

      // If the competitor has a scoring penalty, apply it now.
      const algorithm = getShortAlgorithm(res.resultCode);
      if (algorithm === ResultCodeAlgorithm.scoringPenalty) {
        // RRS 44.3(c): Finish position + (20% * Boats Entered)
        const penalty = Math.round((dnfPoints * 0.2) * 10) / 10;
        // The penalty is capped at the DNF score.
        res.points = Math.min(res.points + penalty, dnfPoints);
      }
    }
    pos += resultsAtValue.length;
  }
}

/** Applies panalties that are not dependent on other 
 * results in the series. 
 */
function applyStaticRacePenalties(results: IntermediateResult[], 
  seriesCompetitorCount: number, 
  scheme: SeriesScoringScheme) {

  // 1. Calculate the number of boats that came to the start area for this specific race
  const startAreaCount = results.filter(r => isStartAreaComp(r.resultCode)).length;

  // This function should only apply penalties to non-finishers.
  // Finishers with penalties (like SCP) are handled in `assignPointsForFinishers`.
  const nonFinishers = results.filter(r => !isFinishedComp(r.resultCode));

  for (const result of nonFinishers) {
    // Determine which algorithm to use based on the scheme
    const algorithm = (scheme === 'longSeries2017')
      ? getLongAlgorithm(result.resultCode) 
      : getShortAlgorithm(result.resultCode);

    switch (algorithm) {
      case ResultCodeAlgorithm.compInSeries:
        result.points = seriesCompetitorCount + 1;
        break;
      case ResultCodeAlgorithm.compInStartArea:
        result.points = startAreaCount + 1;
        break;
      default:
        break;
    }
  }
}

/** 
 * Sorts by points.  Any boat that does not have any points yet 
 * assigned is sorted to the bottom.
 */
function sortByPoints(a: IntermediateResult, b: IntermediateResult): number {
  return (a.points || 9999) - (b.points || 9999);
}

/**
 * Sorts results by a specified ordering property, ensuring that finishers always
 * appear before non-finishers.
 */
function sortByFinishingOrder(a: IntermediateResult, b: IntermediateResult, orderingProperty: keyof IntermediateResult): number {
  const aIsFinisher = isFinishedComp(a.resultCode);
  const bIsFinisher = isFinishedComp(b.resultCode);

  if (aIsFinisher && bIsFinisher) {
    return (a[orderingProperty] as number || 0) - (b[orderingProperty] as number || 0);
  } else if (aIsFinisher && !bIsFinisher) {
    return -1;
  } else if (!aIsFinisher && bIsFinisher) {
    return 1;
  } else {
    return 0; // Keep original order for non-finishers relative to each other
  }
}