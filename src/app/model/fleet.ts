/** Fleet */

import { RatingSystem } from 'app/scoring/handicap';

export interface Fleet {
   name: string; /** Name of the fleet */
   handicapScheme: RatingSystem; /** Default handlicap scheme used for ther fleet */
}
