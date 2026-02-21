import { PublishedSeriesResult } from 'app/published-results';
import { SeriesScoringScheme } from '../model/scoring-algotirhm';
import { PublishedRace } from 'app/published-results/model/published-race';
import { ResultCode } from '../model/result-code';

export interface ScoringConfig {
  seriesType: SeriesScoringScheme;
  discards: number;
}

/**
 * Aggregates pre-scored race results into a final, ranked series result.
 * @param races - An array of PublishedRace objects for the series.
 * @param allCompetitorKeys - A Set of all unique competitor keys in the series.
 * @param config - The scoring configuration for the series.
 * @returns An array of SeriesCompetitorResult, sorted by rank.
 */
export function scoreSeries(races: PublishedRace[], allCompetitorKeys: Set<string>, config: ScoringConfig): PublishedSeriesResult[] {
  const competitorMap = aggregateCompetitorResults(races, allCompetitorKeys, config);
  const resultsWithTotals = calculateTotalsAndDiscards(Array.from(competitorMap.values()), config);
  const rankedResults = rankCompetitors(resultsWithTotals);
  return rankedResults;
}

function aggregateCompetitorResults(races: PublishedRace[], allCompetitorKeys: Set<string>, config: ScoringConfig): Map<string, PublishedSeriesResult> {
  const competitorMap = new Map<string, PublishedSeriesResult>();

  const dncPoints = allCompetitorKeys.size + 1;

  // Initialize the map with all competitors from the series
  allCompetitorKeys.forEach(key => {
    const [helm, sailNumber, boatClass] = key.split('-');
    if (!competitorMap.has(key)) {
      competitorMap.set(key, {
        helm,
        sailNumber: parseInt(sailNumber, 10),
        club: '', // TODO: Where does club info come from?
        handicap: 0, // This needs to come from the competitor so cant just pull out of the key
        boatClass,
        raceScores: [],
        totalPoints: 0,
        netPoints: 0,
        rank: 0,
        tiebreakScores: [],
      });
    }
  });

  for (const race of races) {
    const resultsByKey = new Map(race.results.map(r => [`${r.helm}-${r.sailNumber}-${r.boatClass}`, r]));

    for (const key of allCompetitorKeys) {
      const competitorResult = competitorMap.get(key)!;
      if (!resultsByKey.has(key)) {
        // Competitor did not sail in this race (DNC)
        const dncResult = {
          points: dncPoints,
          resultCode: 'DNC',
          isDiscard: false,
        } as const;
        competitorResult.raceScores.push(dncResult);
      }
    }
  }

  // Now, add the actual scored results from the published races
  races.forEach(race => {
    race.results.forEach(result => {
      const key = `${result.helm}-${result.sailNumber}-${result.boatClass}`;
      const score = {
        points: result.points,
        resultCode: result.resultCode as ResultCode,
        isDiscard: false,
      };
      competitorMap.get(key)?.raceScores.push(score);
    });
  });

  return competitorMap;
}

function calculateTotalsAndDiscards(results: PublishedSeriesResult[], config: ScoringConfig): PublishedSeriesResult[] {
  // Calculate total and net points after all races are processed
  for (const result of results) {
    const sortedScores = [...result.raceScores].sort((a, b) => b.points - a.points); // Sort scores descending for discards
    sortedScores.forEach((score, index) => {
      score.isDiscard = index < config.discards;
    });
    const scoresToCount = sortedScores.filter(s => !s.isDiscard);
    result.netPoints = scoresToCount.reduce((acc, r) => acc + r.points, 0);
    result.totalPoints = result.raceScores.reduce((acc, r) => acc + r.points, 0);
  }
  return results;
}

function rankCompetitors(results: PublishedSeriesResult[]): PublishedSeriesResult[] {
  // For tie-breaking (A8.1), create a sorted list of scores for each competitor
  results.forEach(result => {
    result.tiebreakScores = result.raceScores.map(r => r.points).sort((a, b) => a - b);
  });

  results.sort((a, b) => {
    // Primary sort by net points (ascending)
    if (a.netPoints !== b.netPoints) {
      return a.netPoints - b.netPoints;
    }

    // Tie-break A8.1: most firsts, seconds, etc.
    for (let i = 0; i < Math.min(a.tiebreakScores.length, b.tiebreakScores.length); i++) {
      if (a.tiebreakScores[i] !== b.tiebreakScores[i]) {
        return a.tiebreakScores[i] - b.tiebreakScores[i];
      }
    }

    // Tie-break A8.2: score in the last race
    // To do this correctly, we need to know the index of the last race they both sailed in.
    if (a.raceScores.length > 0 && b.raceScores.length > 0) {
      // Sort scores ascending (worst is discarded first)
      const lastRaceA = [...a.raceScores].sort((s1, s2) => s1.points - s2.points)[a.raceScores.length - 1];
      const lastRaceB = [...b.raceScores].sort((s1, s2) => s1.points - s2.points)[b.raceScores.length - 1];
      return lastRaceA.points - lastRaceB.points;
    }

    return 0;
  });

  // Assign ranks
  let currentRank = 1;
  for (let i = 0; i < results.length; i++) {
    if (i > 0 && isTied(results[i - 1], results[i])) {
      results[i].rank = results[i - 1].rank;
    } else {
      results[i].rank = currentRank;
    }
    currentRank++;
  }

  return results;
}

function isTied(a: PublishedSeriesResult, b: PublishedSeriesResult): boolean {
  if (a.netPoints !== b.netPoints) {
    return false;
  }

  if (a.tiebreakScores.length !== b.tiebreakScores.length) {
    return false;
  }

  for (let i = 0; i < a.tiebreakScores.length; i++) {
    if (a.tiebreakScores[i] !== b.tiebreakScores[i]) {
      return false;
    }
  }

  return true;
}
