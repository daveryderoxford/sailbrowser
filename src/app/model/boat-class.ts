/** A class of boat eg Fireball, Topper etc */

import { Handicap } from 'app/scoring/handicap';

export interface BoatClass {
   name: string;
   handicaps: Handicap[];
}
