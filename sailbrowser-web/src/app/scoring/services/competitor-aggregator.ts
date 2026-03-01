import { RaceCompetitor } from '../../results-input/model/race-competitor';
import { PublishedRace } from 'app/published-results';

/**
 * Gets all the unique competitor keys for a set of competitors.
 * The key is a composite of helm, sail number, and boat class.
 * @param competitors - An array of RaceCompetitor objects.
 * @returns A Set of unique string keys.
 */
export function getAllCompetitorKeys(competitors: RaceCompetitor[]): Set<string> {
  const keys = new Set<string>();
  competitors.forEach(res => keys.add(`${res.helm}-${res.sailNumber}-${res.boatClass}`));
  return keys;
}

/**
 * Gets all the unique competitor keys from an array of already published races.
 * @param races - An array of PublishedRace objects.
 * @returns A Set of unique string keys.
 */
export function getAllCompetitorKeysFromPublished(races: PublishedRace[]): Set<string> {
  const keys = new Set<string>();
  races.forEach(race =>
    race.results.forEach(res => keys.add(`${res.helm}-${res.sailNumber}-${res.boatClass}`)));
  return keys;
}