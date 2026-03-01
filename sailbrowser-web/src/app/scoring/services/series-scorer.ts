import { PublishedSeriesResult } from 'app/published-results';
import { SeriesScoringScheme } from '../model/scoring-algotirhm';
import { PublishedRace } from 'app/published-results/model/published-race';

export interface ScoringConfig {
  seriesType: SeriesScoringScheme;
  discards: number;
}

/**
 * Intermediate data structure for series scoring calculations.
 */
export interface IntermediateSeriesResult extends PublishedSeriesResult {
  racesSailed: number;
  averagePoints: number;
}

/**
 * Aggregates pre-scored race results into a final, ranked series result.
 * @param races - An array of PublishedRace objects for the series.
 * @param allCompetitorKeys - A Set of all unique competitor keys in the series.
 * @param config - The scoring configuration for the series.
 * @returns An array of SeriesCompetitorResult, sorted by rank.
 */
export function scoreSeries(races: PublishedRace[], allCompetitorKeys: Set<string>, config: ScoringConfig): IntermediateSeriesResult[] {
  const competitorMap = aggregateCompetitorResults(races, allCompetitorKeys);
  const resultsWithTotals = calculateTotalsAndDiscards(Array.from(competitorMap.values()), config);
  const rankedResults = rankCompetitors(resultsWithTotals);

  return rankedResults;
}

function aggregateCompetitorResults(races: PublishedRace[], allCompetitorKeys: Set<string>): Map<string, IntermediateSeriesResult> {
  const competitorMap = new Map<string, IntermediateSeriesResult>();
  const dncPoints = allCompetitorKeys.size + 1;

  // Find the first result for each competitor to get their details
  const competitorDetails = new Map<string, { club?: string; handicap: number }>();
  for (const race of races) {
    for (const result of race.results) {
      const key = `${result.helm}-${result.sailNumber}-${result.boatClass}`;
      if (!competitorDetails.has(key)) {
        competitorDetails.set(key, { club: result.club, handicap: result.handicap });
      }
    }
  }

  allCompetitorKeys.forEach(key => {
    const [helm, sailNumber, boatClass] = key.split('-');
    const details = competitorDetails.get(key) || { club: '', handicap: 0 };
    competitorMap.set(key, {
      helm,
      sailNumber: parseInt(sailNumber, 10),
      club: details.club || '',
      handicap: details.handicap,
      boatClass,
      raceScores: [],
      totalPoints: 0,
      netPoints: 0,
      rank: 0,
      scoresForTiebreak: [],
      racesSailed: 0,
      averagePoints: 0,
    });
  });

  races.forEach((race, raceIndex) => {
    const resultsByKey = new Map(race.results.map(r => [`${r.helm}-${r.sailNumber}-${r.boatClass}`, r]));
    competitorMap.forEach((seriesResult, key) => {
      const raceResult = resultsByKey.get(key);
      if (raceResult) {
        seriesResult.raceScores.push({ raceIndex, points: raceResult.points, resultCode: raceResult.resultCode, isDiscard: false });
      } else {
        // Competitor did not compete in this race (DNC)
        seriesResult.raceScores.push({
          raceIndex: raceIndex,
          points: dncPoints,
          resultCode: 'DNC',
          isDiscard: false,
        });
      }
    });
  });

  return competitorMap;
}

function calculateTotalsAndDiscards(results: IntermediateSeriesResult[], config: ScoringConfig): IntermediateSeriesResult[] {
  // Calculate total and net points after all races are processed
  for (const result of results) {
    const sortedScores = [...result.raceScores].sort((a, b) => b.points - a.points); // Sort scores descending for discards
    sortedScores.forEach((score, index) => {
      score.isDiscard = index < config.discards;
    });
    const scoresToCount = sortedScores.filter(s => !s.isDiscard);
    result.netPoints = scoresToCount.reduce((acc, r) => acc + r.points, 0);
    result.totalPoints = result.raceScores.reduce((acc, r) => acc + r.points, 0);

    // Calculate average points
    result.racesSailed = result.raceScores.filter(r => r.resultCode !== 'DNC').length;
    result.averagePoints = result.racesSailed > 0 ? result.totalPoints / result.racesSailed : 0;
  }
  return results;
}

function rankCompetitors(results: IntermediateSeriesResult[]): IntermediateSeriesResult[] {
  // For tie-breaking (A8.1), create a sorted list of scores for each competitor
  results.forEach(result => {
    result.scoresForTiebreak = result.raceScores.map(r => r.points).sort((a, b) => a - b);
  });

  results.sort((a, b) => {
    // Primary sort by net points (ascending)
    if (a.netPoints !== b.netPoints) {
      return a.netPoints - b.netPoints;
    }

    // Tie-break A8.1: most firsts, seconds, etc.
    for (let i = 0; i < Math.min(a.scoresForTiebreak.length, b.scoresForTiebreak.length); i++) {
      if (a.scoresForTiebreak[i] !== b.scoresForTiebreak[i]) {
        return a.scoresForTiebreak[i] - b.scoresForTiebreak[i];
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

function isTied(a: IntermediateSeriesResult, b: IntermediateSeriesResult): boolean {
  if (a.netPoints !== b.netPoints) {
    return false;
  }

  if (a.scoresForTiebreak.length !== b.scoresForTiebreak.length) {
    return false;
  }

  for (let i = 0; i < a.scoresForTiebreak.length; i++) {
    if (a.scoresForTiebreak[i] !== b.scoresForTiebreak[i]) {
      return false;
    }
  }

  return true;
}
