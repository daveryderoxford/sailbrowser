import { RaceType } from 'app/race-calender/@store/race-type';

export interface RaceResult {
   boatClass: string;
   sailNumber: number;
   helm: string;
   crew: string;
   name: string;
   laps: number;
   elapsed: number;
   corrected: number;
   points: number;
}

/** Imutable race reaulkts object */
export interface PublishedRace {
   id: string;
   seriesName: string;
   index: number;
   fleetId: string;
   seriesId: string;
   raceOfDay: number;
   type: RaceType;
   isDiscardable: boolean;
   results: RaceResult[]
}