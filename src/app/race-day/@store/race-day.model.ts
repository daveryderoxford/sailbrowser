import { Race } from 'app/model/race';
import { RaceSeries } from 'app/race-series/@store/race-series.model';

export interface raceDayRace {
  race: Race;
  start: number;
}

export interface RaceDay {
  id: number | string;
  date: string;
  races: Race[];
}

export function createRaceDay(params: Partial<RaceDay>) {
  return {
    id: '',
    date: '',
    races: [],
  } as RaceDay;
}
