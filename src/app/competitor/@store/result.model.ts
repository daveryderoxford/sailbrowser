/* eslint-disable max-len */

import { ResultCode } from 'app/scoring/result-code';
import { CompetitorDetails } from './competitor.model';

export interface Result extends CompetitorDetails {
  id: string;
  raceId: string;              /** ID of race the race is part of  */
  seriesId: string;            /** ID of the series */
  seriesCompetitorId: string;  /** Series entry this race entry is part of */

  /* Results data */
  position: number;        /** The computed position.  This will be updated as part of the results calculation algorithm in ISO format */
  points: number;          /** Number of points scored for the race */
  startTime: string;       /** Time of the start.  If '' then race statr time will be used.  */
  finishTime: string;      /** The final fnish time used in calculated the results.  If no time is avalaible this will be set to zero in milliseconds */
  elapsedTime: number;     /** Time taken for the competior toi comple the race before any handicap calculations have been applied */
  correctedTime: number;   /** Corrected time set after taking into account handicap and any time penalties in milliseconds */
  resultCode: ResultCode;  /** Result code OCS DNS etc */
  isDiscarded: boolean;    /** Is the result discarded */
  isDiscardable: boolean;  /** Can the result be discarded - Can either be a result of the race being non-discarable or DNE penalty*/
  laps: number;            /** Number of laps - Potentially manually set so not necessarly consistent with lap times */
  lapTimes: string[];      /** Array of lap times */
}

export function createResult(params: Partial<Result>) {
  return {
    id: '',
    raceId: '',
    seriesId: '',
    seriesCompetitorId: '',
    helm: '',
    crew: '',
    boatClass: '',
    sailNumber: 0,
    handicap: 0,

    /** Results data */
    position: 0,
    points: 0,
    startTime: '',
    finishTime: '',
    elapsedTime: 0,
    correctedTime: 0,
    resultCode: 'NotFinished',
    isDiscarded: false,
    isDiscardable: false,
    laps: 0,
    lapTimes: [],
    ...params
  };
}

