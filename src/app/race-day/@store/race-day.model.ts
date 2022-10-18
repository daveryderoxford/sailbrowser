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

export function createRaceDayStart( params: Partial<Start>): Start {
  return {
    raceIds: [],
    state: 'Future',
    ...params
  };
}

export function createRaceDay(params: Partial<RaceDay>) {
  return {
    id: makeRaceDayKey( new Date()),
    date: '',
    starts: [],
  } as RaceDay;
}
