import { PublishedRace } from 'app/published-results/model/published-race';
import { IntermediateSeriesResult } from './series-scorer';
import { Race } from '../../race-calender/model/race';
import { RaceCompetitor } from '../../results-input/model/race-competitor';
import { scoreRace, rescoreRacePoints } from './race-scorer';
import { scoreSeries, ScoringConfig } from './series-scorer';
import { Series } from 'app/race-calender';
import { SeriesEntry } from 'app/results-input';

/**
 * Orchestrates the entire scoring process for a series as a pure function.
 * It implements the "Scoring Grid" pattern for multi-pass calculations.
 * 1. Initializes a mutable "scoring grid".
 * 2. Scores the current race and updates the grid.
 * 3. Re-scores all other races in case the number of series competitors changed.
 * 4. Performs a first-pass series scoring to calculate averages.
 * 5. Applies series-dependent scores (like averages) back to the grid.
 * 6. Performs the final series scoring.
 * 7. Updares race resuklts with rdg values. 
 * @returns An object containing the final scored races and series results.
 */
export function score(
  series: Series,
  raceToScore: Race,
  competitorsInRace: RaceCompetitor[],
  existingScoredRaces: PublishedRace[],
  seriesEntries: SeriesEntry[],
  config: ScoringConfig
): { scoredRaces: PublishedRace[], seriesResults: IntermediateSeriesResult[]; } {

  // 1. Initialize the "Scoring Grid" by creating a mutable copy of the races.
  const scoringGrid: PublishedRace[] = JSON.parse(JSON.stringify(existingScoredRaces));
  const existingRaceIndex = scoringGrid.findIndex(r => r.id === raceToScore.id);
  if (existingRaceIndex > -1) {
    scoringGrid[existingRaceIndex] = { ...scoringGrid[existingRaceIndex], ...raceToScore, results: [] };
  } else {
    scoringGrid.push({ ...raceToScore, results: [] });
  }

  const seriesCompetitorCount = seriesEntries.length;

  // 3. Score the current race and update it in the grid.
  const newScoredRaceResults = scoreRace(raceToScore, competitorsInRace, seriesEntries, series.scoringScheme.handicapScheme, config.seriesType, seriesCompetitorCount);
  const raceToUpdate = scoringGrid.find(r => r.id === raceToScore.id)!;
  raceToUpdate.results = newScoredRaceResults;

  // 4. Re-score points for all other races.
  scoringGrid.forEach(r => {
    if (r.id !== raceToScore.id) {
      rescoreRacePoints(r, seriesCompetitorCount, config.seriesType);
    }
  });

  // 5. Final series scoring with the fully updated grid.
  // This now handles RDG scores internally.
  const finalSeriesResults = scoreSeries(scoringGrid, seriesEntries, config);

  // 6. Update the scoring grid with points calculated during series scoring (e.g., RDG).
  finalSeriesResults.forEach(seriesResult => {
    seriesResult.raceScores.forEach(raceScore => {
      const race = scoringGrid.find(r => r.index === raceScore.raceIndex);
      if (race) {
        const raceResult = race.results.find(res => res.seriesEntryId === seriesResult.seriesEntryId);
        if (raceResult) raceResult.points = raceScore.points;
      }
    });
  });

  scoringGrid.sort((a, b) => a.index - b.index);

  return { scoredRaces: scoringGrid, seriesResults: finalSeriesResults };
}
