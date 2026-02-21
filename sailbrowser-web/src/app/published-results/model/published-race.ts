import { RaceType } from '../../race-calender/model/race-type';
import { ResultCode } from 'app/scoring/model/result-code';

/** Immutable race results object, stored in the `published_races` collection. */
export interface PublishedRace {
   id: string;
   seriesName: string;
   index: number;
   fleetId: string;
   seriesId: string;
   raceOfDay: number;
   scheduledStart: Date;
   type: RaceType;
   isDiscardable: boolean;
   results: RaceResult[]
}

export interface RaceResult {
   boatClass: string;
   sailNumber: number;
   helm: string;
   crew?: string;
   handicap: number;
   laps: number;
   startTime: Date;
   finishTime: Date;
   elapsedTime: number;
   correctedTime: number;
   points: number;
   resultCode: ResultCode;
}