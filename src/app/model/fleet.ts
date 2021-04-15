/** Fleet */

import { RatingSystem } from 'app/scoring/handicap';

export interface Fleet {
   id: string; /** Immutable key to the fleet */
   shortName: string;  /** Abbrivated fleet name - Maximum 9 characters */
   name: string; /** Name of the fleet */
   handicapScheme: RatingSystem; /** Default handlicap scheme used for ther fleet */
}
