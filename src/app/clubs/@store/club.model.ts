import { BoatClass } from 'app/model/boat-class';
import { Fleet } from 'app/model/fleet';
import { RatingSystem } from 'app/scoring/handicap';
import { SeriesScoringData } from 'app/scoring/series-scoring';
import { StartFlagSequence } from 'app/start/@store/start.store';

export enum ClubStatus {
  New,
  Active,
  Archived
}

export interface Club {
  id: string;
  name: string;
  status: ClubStatus;
  contactEmail: string;
  icon: string;
  fleets: Fleet[];
  boatClasses: BoatClass[];
  handicapSchemes: RatingSystem[];
  defaultScoringScheme: SeriesScoringData;
  defaultFlagStartSequence: StartFlagSequence;
}

/** Create a defult club for testing purposes */
export function testClub(): Club {

  return createClub( {
    id: 'TestClub',
    name: 'Test Club',
    contactEmail: 'dave@theryderclan.co.uk',
    icon: '',
    status: ClubStatus.Active,
    fleets: [
      { id: 'FHC', shortName: 'Fast HCap', name: 'Fast Handicap', handicapScheme: 'RYA_PY', classFlag: 'a'},
      { id: 'MHC', shortName: 'Med HCap', name: 'Medium Handicap', handicapScheme: 'RYA_PY', classFlag: 'b' },
      { id: 'SHC', shortName: 'Slow HCap', name: 'Slow Handicap', handicapScheme: 'RYA_PY', classFlag: 'c' },
      { id: 'FB', shortName: 'Fireball', name: 'Fireball', handicapScheme: 'RYA_PY', classFlag: 'd' },
      { id: 'Way', shortName: 'Wayfarer', name: 'Wayfarer', handicapScheme: 'RYA_PY', classFlag: 'e' },
      { id: 'Sprite', shortName: 'Sprite', name: 'Sprite', handicapScheme: 'RYA_PY', classFlag: 'f' },
      { id: 'Mirror', shortName: 'Mirror', name: 'Mirror', handicapScheme: 'RYA_PY', classFlag: 'g' },
      { id: 'Topper', shortName: 'Topper', name: 'Topper', handicapScheme: 'RYA_PY', classFlag: 'h' },
      { id: 'Optimist', shortName: 'Optimist', name: 'Optimist', handicapScheme: 'RYA_PY', classFlag: 'i' },
      { id: 'FastC', shortName: 'F Crusier', name: 'Fast Crusier', handicapScheme: 'RYA_NHC', classFlag: 'j' },
      { id: 'SlowC', shortName: 'C Crusier', name: 'Club Crusier', handicapScheme: 'RYA_NHC', classFlag: 'k' },
    ],
    boatClasses: [ {name: 'Laser', handicaps: [{ scheme: 'RYA_PY', value: 1105 }], type: 'SingleHander' }],
    handicapSchemes: ['RYA_PY', 'RYA_NHC'],
    defaultFlagStartSequence: {
      interval: 2,
      classUp: 4,
      prepUp: 2,
      prepDown: 0,
      classDown: 0
    },
  }) as Club;
}

export function createClub(params: Partial<Club>): Partial<Club> {
  return {
    id: '',
    name: '',
    status: ClubStatus.New,
    contactEmail: '',
    icon: '',
    fleets: [],
    boatClasses: [],
    handicapSchemes: [],
    defaultScoringScheme: {
      scheme: 'ISAF2017LongSeries',
      ood: {
        algorithm: 'AverageSailedRacesIncludingDiscards',
        maxPerSeries: 2,
      },
      discards: {
        initialDiscardAfter: 3,
        subsequentDiscardsEveryN: 2
      }
    },
    defaultFlagStartSequence: {
      interval: 5,
      classUp: 5,
      prepUp: 4,
      prepDown: 1,
      classDown: 0
    },
    ...params
  };
}
