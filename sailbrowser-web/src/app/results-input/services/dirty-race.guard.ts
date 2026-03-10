import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { RaceCalendarStore } from 'app/race-calender';
import { ScoringEngine } from 'app/published-results';
import { ManualResultsPage } from '../presentation/manual-results-page/manual-results-page';

/**
 * A route guard that checks for "dirty" races before deactivating the route.
 * If any dirty races are found, it automatically publishes them using the ScoringEngine.
 */
export const dirtyRaceGuard: CanDeactivateFn<ManualResultsPage> = async (component, currentRoute, currentState, nextState) => {
  const raceStore = inject(RaceCalendarStore);

  const scoringEngine = inject(ScoringEngine);

  // Find all races that have been marked as dirty
  const dirtyRaces = raceStore.allRaces().filter(race => race.dirty);

  if (dirtyRaces.length === 0) {
    return true; // No dirty races, allow navigation immediately.
  }

  console.log(`Found ${dirtyRaces.length} dirty race(s) to publish...`);

  // Create an array of promises for publishing each dirty race.
  const publishPromises = dirtyRaces.map(race => scoringEngine.publishRace(race));

  // Wait for all publishing operations to complete.
  await Promise.all(publishPromises);  

  return true; // Allow navigation to proceed.
};
