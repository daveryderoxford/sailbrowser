/** A class of boat eg Fireball, Topper etc */

import { Handicap, RatingSystem } from 'app/scoring/handicap';

export interface BoatClass {
   name: string;
   handicaps: Handicap[];
   type: string;
}

  export function boatClassHandicap( boatClasses: BoatClass[], className: string, scheme: RatingSystem ): Handicap | undefined {
    return boatClasses.find( c => c.name === className )?.handicaps.find( s => s.scheme === scheme);
  }
