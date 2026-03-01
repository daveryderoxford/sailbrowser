import { PublishedRace, RaceResult } from 'app/published-results/model/published-race';
import { getScoringData, isStarter, ResultCodeAlgorithm } from '../model/result-code-scoring';
import { IntermediateSeriesResult } from './series-scorer';

function startersInRace(results: RaceResult[]): number {
  return results.reduce((count, comp) => {
    return isStarter(comp.resultCode) ? count + 1 : count;
  }, 0);
}

export function applySeriesDependentScores(
  races: PublishedRace[],
  seriesResults: IntermediateSeriesResult[],
  seriesType: 'long' | 'short',
): PublishedRace[] {
  const seriesResultsByKey = new Map(seriesResults.map(r => [`${r.helm}-${r.sailNumber}-${r.boatClass}`, r]));

  // Create a deep copy of races to avoid direct mutation
  const updatedRaces = JSON.parse(JSON.stringify(races));

  for (const race of updatedRaces) {
    const dnfPoints = startersInRace(race.results) + 1;

    for (const result of race.results) {
      const scoringData = getScoringData(result.resultCode);
      if (!scoringData) continue;

      const algorithm = seriesType === 'long' ? scoringData.longSeriesAlgorithm : scoringData.shortSeriesAlgorithm;
      const competitorSeriesResult = seriesResultsByKey.get(`${result.helm}-${result.sailNumber}-${result.boatClass}`);

      switch (algorithm) {
        case ResultCodeAlgorithm.avgAll:
          if (competitorSeriesResult) {
            result.points = competitorSeriesResult.averagePoints;
          }
          break;

        case ResultCodeAlgorithm.avgBefore:
          // This is more complex, as we need the average of races *before* this one.
          // This will require a separate calculation.
          // For now, as a placeholder, we will use the overall average.
          if (competitorSeriesResult) {
            result.points = competitorSeriesResult.averagePoints;
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
  }

  return updatedRaces;
}
