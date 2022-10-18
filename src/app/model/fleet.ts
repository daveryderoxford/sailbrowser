/** Fleet */

import { RatingSystem } from 'app/scoring/scoring';

export interface Fleet {
   id: string; /** Immutable key to the fleet */
   shortName: string;  /** Abbrivated fleet name - Maximum 9 characters */
   name: string; /** Name of the fleet */
   handicapScheme: RatingSystem; /** Default handicap scheme used for ther fleet */
   classFlag: string; /** Name of class flag */
}

export function createFleet(params: Partial<Fleet>): Partial<Fleet> {
  return {
    id: '',
    name: '',
    shortName: '',
    handicapScheme: 'RYA_PY',
    classFlag: '',
    ...params
  };
}
