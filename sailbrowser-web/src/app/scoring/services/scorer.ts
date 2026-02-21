import { PublishedRace } from 'app/published-results/model/published-race';
import { PublishedSeriesResult } from 'app/published-results/model/published-series';
import { Race } from '../../race-calender/model/race';
import { RaceCompetitor } from '../../results-input/model/race-competitor';
import { getAllCompetitorKeys } from './competitor-aggregator';
import { scoreRace } from './race-scorer';
import { scoreSeries, ScoringConfig } from './series-scorer';
import { Series } from '../../race-calender/model/series';

/**
 * Orchestrates the entire scoring process for a series.
 * 1. Determines all unique competitors in the series.
 * 2. Scores each race individually, providing the series competitor count for accurate point calculation.
 * 3. Aggregates the scored races into final series results.
 *
 * @param series - The series configuration.
 * @param races - The raw race data (not yet published/scored).
 * @param competitors - All competitors who have participated in at least one race in the series.
 * @param config - The scoring configuration for the series.
 * @returns The final, ranked series results.
 */
export function score(
  series: Series,
  races: Race[],
  competitors: RaceCompetitor[],
  config: ScoringConfig
): { scoredRaces: PublishedRace[], seriesResults: PublishedSeriesResult[] } {
  
   // 1. Determine the competitors in the series
  const seriesCompetitorKeys = getAllCompetitorKeys(competitors);
  const seriesCompetitorCount = seriesCompetitorKeys.size;

  // 2. Calculate times and points for each race using raceScorer
  const scoredRaces: PublishedRace[] = races.map(race => {
    const raceCompetitors = competitors.filter(c => c.raceId === race.id);
    const results = scoreRace(raceCompetitors, series.scoringScheme.handicapSystem, race, config.seriesType, seriesCompetitorCount);
    return { ...race, results };
  });

  // 3. Score the series points and positions using series scorer
  const seriesResults = scoreSeries(scoredRaces, seriesCompetitorKeys, config);

  return { scoredRaces, seriesResults };
}