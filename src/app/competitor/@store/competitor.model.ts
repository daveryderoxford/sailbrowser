/* eslint-disable max-len */
import { ResultCode } from 'app/model/result-code';

export interface SeriesCompetitor {
  id: string;
  raceId: string;        /** ID of series the race is part of  */
  seriesId: string;      /** Series entry this race entry is part of */
  boatId: string;        /** Id of boat in boat list */
  helm: string;                /** Helm is a single person */
  crew: string;                /** Array of crew names */
  boatClass: string;           /** This will be used to match the class name in the classes */
  sailnumber: number;          /** Sail number */
  handicap: number;            /** Handicap value  (for handicap) */
  results: RaceResult[];       /** Results for races */
}

export const createSeriesCompetitor = (params: Partial<SeriesCompetitor>) => ({
    id: '',
    raceId: '',
    seriesId: '',
    boatId: '',
    helm: '',
    crew: '',
    boatClass: '',
    sailnumber: 0,
    handicap: 0,
    results: [],
    ...params
  });

export interface RaceResult {
  id: string;
  raceId: string;              /** ID of series the race is part of  */
  seriesCompetitorId: string;  /** Series entry this race entry is part of */
  helm: string;                /** Helm is a single person */
  crew: string;                /** Array of crew names */
  boatClass: string;           /** This will be used to match the class name in the classes */
  sailNumber: number;          /** Sail number */
  handicap: number;            /** Handicap value. */
  /* Results data */
  position: number;        /** The computed position.  This will be updated as part of the results calculation algorithm in ISO format */
  points: number;          /** Number of points scored for the race */
  finishTime: string;      /** The final fnish time used in calculated the results.  If no time is avalaible this will be set to zero in milliseconds */
  elapsedTime: number;     /** Time taken for the competior toi comple the race before any handicap calculations have been applied */
  correctedTime: number;   /** Corrected time set after taking into account handicap and any time penalties in milliseconds */
  resultCode: ResultCode;  /** Result code OCS DNS etc */
  isDiscarded: boolean;    /** Is the result discarded */
  isDiscardable: boolean;  /** Can the result be discarded - Can either be a result of the race being non-discarable or DNE penalty*/
  laps: number;            /** Number of laps - Potentially manually set so not necessarly consistent with lap times */
  lapTimes: string[];      /** Array of lap times */
}

export function createRaceResult(params: Partial<RaceResult>) {
  return {
    id: '',
    raceId: '',
    seriesCompetitorId: '',
    helm: '',
    crew: '',
    boatClass: '',
    sailNumber: 0,
    handicap: 0,

    /** Results data */
    position: 0,
    points: 0,
    finishTime: '',
    elapsedTime: 0,
    correctedTime: 0,
    resultCode: 'NotFinished',
    isDiscarded: false,
    isDiscardable: false,
    laps: 0,
    timeRecordIds: [],
    ...params
  };
}

