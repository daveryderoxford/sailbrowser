import { guid } from '@datorama/akita';
import { Race, RaceState } from 'app/model/race';
import { SeriesScoringData } from 'app/scoring/series-scoring';

export interface RaceSeries {
  id: string;
  name: string;
  fleet: string;
  startDate: string;
  endDate: string;
  races: Race[];
  scoringScheme: SeriesScoringData;
}

export function createSeries(params: Partial<RaceSeries>): RaceSeries {
  return {
    id: '',
    name: '',
    fleet: '',
    startDate: '',
    endDate: '',
    races: [],
    scoringScheme: {
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
    ...params,
  };
}

export function createRace(params: Partial<Race>): Race {
  return {
    id: guid(),
    seriesId: '',
    scheduledStart: '',
    actualStart: '',
    startType: 'Conventional',
    status: 'Future',
    isDiscardable: true,
    startNumber: 0,
    ...params
  };
}
