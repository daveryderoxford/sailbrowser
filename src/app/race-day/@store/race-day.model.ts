import { Race } from 'app/model/race';
import { RaceSeries } from 'app/race-series/@store/race-series.model';
import { startOfDay } from 'date-fns';

export interface Start {
  raceIds: string[];
  state: 'Future' | 'Completed';
}

export interface RaceDay {
  id: number | string;
  date: string;
  starts: Start[];
}

export function makeRaceDayKey( date: Date): string {
    return( startOfDay( date).toISOString() );
}

export function createRaceDayStart( start: Partial<Start>): Start {
  return {
    raceIds: [],
    state: 'Future',
    ...start
  };
}

export function createRaceDay(params: Partial<RaceDay>) {
  return {
    id: makeRaceDayKey( new Date()),
    date: '',
    starts: [],
  } as RaceDay;
}
