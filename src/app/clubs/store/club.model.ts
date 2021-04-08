import { stringify } from '@angular/compiler/src/util';
import { BoatClass } from 'app/model/boat-class';
import { Fleet } from 'app/model/fleet';
import { StartSequence, StartSequenceType } from 'app/model/start-sequence';
import { RatingSystem } from 'app/scoring/handicap';
import { SeriesScoringData, SeriesScoringScheme } from 'app/scoring/series-scoring';

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
  defaultStartSequence: StartSequence;
}

/** Create a defult club for testing purposes */
export function testClub(): Club {

  return createClub( {
    id: 'IBSC',
    name: 'Island Barn',
    contactEmail: 'dave@theryderclan.co.uk',
    icon: '',
    status: ClubStatus.Active,
    fleets: [
      { name: 'Fast Handicap', handicapScheme: 'RYA_PY' },
      { name: 'Medium Handicap', handicapScheme: 'RYA_PY' },
      { name: 'Slow Handicap', handicapScheme: 'RYA_PY' },
      { name: 'Fireball', handicapScheme: 'RYA_PY' },
      { name: 'Wayfarer', handicapScheme: 'RYA_PY' },
      { name: 'Sprite', handicapScheme: 'RYA_PY' },
      { name: 'Mirror', handicapScheme: 'RYA_PY' },
      { name: 'Topper', handicapScheme: 'RYA_PY' },
      { name: 'Optimist', handicapScheme: 'RYA_PY' },
      { name: 'Fast Crusier', handicapScheme: 'RYA_NHC' },
      { name: 'Club Crusier', handicapScheme: 'RYA_NHC' },
    ],
    handicapSchemes: ['RYA_PY', 'RYA_NHC'],
    defaultStartSequence: {
      type: 'FixedInterval',
      interval: 2
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
    defaultStartSequence: {
      type: 'ISAF',
      interval: 0
    },
    ...params
  };
}




