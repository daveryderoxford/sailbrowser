import { PublishedRace } from 'app/published-results/model/published-race';
import { Race } from '../../race-calender/model/race';
import { RaceCompetitor } from '../../results-input/model/race-competitor';
import { getAllCompetitorKeys, getAllCompetitorKeysFromPublished } from './competitor-aggregator';
import { scoreRace, rescoreRacePoints } from './race-scorer';
import { scoreSeries, ScoringConfig, IntermediateSeriesResult } from './series-scorer';
import { Series } from '../../race-calender/model/series';

/**
 * Orchestrates the entire scoring process for a series.
 * 1. Determines all unique competitors in the series.
 * 2. Scores each race individually, providing the series competitor count for accurate point calculation.
 * 3. Aggregates the scored races into final series results.
 */
export function score(
  series: Series,
  raceToScore: Race,
  competitorsInRace: RaceCompetitor[],
  existingScoredRaces: PublishedRace[],
  config: ScoringConfig
): { scoredRaces: PublishedRace[], seriesResults: IntermediateSeriesResult[]; } {

  // 1. Determine all unique competitors in the series from both the current race and existing races.
  const keysFromCurrentRace = getAllCompetitorKeys(competitorsInRace);
  const keysFromExistingRaces = getAllCompetitorKeysFromPublished(existingScoredRaces);
  const allSeriesCompetitorKeys = new Set([...keysFromCurrentRace, ...keysFromExistingRaces]);
  const seriesCompetitorCount = allSeriesCompetitorKeys.size;

  // 2. Score the race that was just sailed.
  const newScoredRace: PublishedRace = {
    ...raceToScore,
    results: scoreRace(raceToScore,
                        competitorsInRace,
                        series.scoringScheme.handicapSystem,
                        config.seriesType,
                        seriesCompetitorCount)
  };

  // 3. Combine the new race with existing ones, replacing it if it was already scored.
  const combinedRaces = [
    ...existingScoredRaces.filter(r => r.id !== newScoredRace.id),
    newScoredRace
  ];

  // 4. Re-score points for non-finishers in all races, as the series competitor count may have changed.
  const scoredRaces = combinedRaces.map(race => {
    // The new race is already scored with the correct count.
    if (race.id === newScoredRace.id) {
      return race;
    }
    // Re-score older races if the competitor count has changed.
    return rescoreRacePoints(race, seriesCompetitorCount, series.scoringScheme.scheme);
  }).sort((a, b) => a.index - b.index);

  // 5. Score the complete series with the updated set of races.
  const seriesResults = scoreSeries(scoredRaces, allSeriesCompetitorKeys, config);

  return { scoredRaces, seriesResults };
}