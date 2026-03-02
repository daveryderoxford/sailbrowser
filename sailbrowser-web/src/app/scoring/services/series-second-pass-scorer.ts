import { PublishedRace, RaceResult } from 'app/published-results/model/published-race';
import { getLongAlgorithm, getShortAlgorithm, isStartAreaComp, ResultCodeAlgorithm } from '../model/result-code-scoring';
import { calculateRanks, sortByPoints } from './race-scorer';
import { IntermediateSeriesResult } from './series-scorer';
import { SeriesScoringScheme } from '../model/scoring-algotirhm';

function startersInRace(results: RaceResult[]): number {
  return results.reduce((count, comp) => {
    return isStartAreaComp(comp.resultCode) ? count + 1 : count;
  }, 0);
}

export function applySeriesDependentScores(
  races: PublishedRace[],
  seriesResults: IntermediateSeriesResult[],
  seriesType: SeriesScoringScheme,
): void {
  const seriesResultsByKey = new Map(seriesResults.map(r => [`${r.helm}-${r.sailNumber}-${r.boatClass}`, r]));

  for (const race of races) {
    const dnfPoints = startersInRace(race.results) + 1;
    let wasModified = false;

    for (const result of race.results) {

      const algorithm = (seriesType === 'long')
        ? getLongAlgorithm(result.resultCode)
        : getShortAlgorithm(result.resultCode);

      const competitorSeriesResult = seriesResultsByKey.get(`${result.helm}-${result.sailNumber}-${result.boatClass}`);

      switch (algorithm) {
        case ResultCodeAlgorithm.avgAll:
          if (competitorSeriesResult) {
            result.points = competitorSeriesResult.averagePoints;
            wasModified = true;
          }
          break;

        case ResultCodeAlgorithm.avgBefore:
          if (competitorSeriesResult) {
            const avgBefore = competitorSeriesResult.averagePointsBefore.find(a => a.raceIndex === race.index);
            if (avgBefore) {
              result.points = avgBefore.points;
            }
            wasModified = true;
          }
          break;

        case ResultCodeAlgorithm.setByHand:
          // This indicates that points should not be changed by the system.
          // No action needed.
          break;

        default:
          // No action needed for other algorithms like compInSeries, compInStartArea, na
          break;
      }
    }
    // If points were changed, the race must be re-sorted and re-ranked.
    if (wasModified) {
      race.results.sort(sortByPoints);
      calculateRanks(race.results);
    }
  }
}
