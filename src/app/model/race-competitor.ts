/** Competitor in a race.
 * A race competitor is created when the competitor enters the race
 */

import { ResultCode } from './result-code';

export interface RaceCompetitor {
  raceId: string;              /** ID of series the race is part of  */
  seriesCompetitorId: string;  /** Series entry this race entry is part of */
  helm: string;                /** Helm is a single person */
  crew: string;                /** Array of crew names */
  boatClass: string;           /** This will be used to match the class name in the classes */
  sailnumber: number;          /** Sail number */
  handicap: number;            /** Handicap value. */

  /** Results data */
  position: number;        /** The computed position.  This will be updated as part of the results calculation algorithm in ISO format */
  points: number;          /** Number of points scored for the race */
  finishTime: number;      /** The final fnish time used in calculated the results.  If no time is avalaible this will be set to zero in milliseconds */
  elapsedTime: number;     /** Time taken for the competior toi comple the race before any handicap calculations have been applied */
  correctedTime: number;   /** Corrected time set after taking into account handicap and any time penalties in milliseconds */
  resultCode: ResultCode;  /** Result code OCS DNS etc */
  isDiscarded: boolean;    /** Is the result discarded */
  isDiscardable: boolean;  /** Can the result be discarded - Can either be a result of the race being non-discarable or DNE penalty*/
  laps: number;
  timeRecordIds: string[]; /** Array of lap times and finish time records */
}

export function createRaceCompetitor(params: Partial<RaceCompetitor>): Partial <RaceCompetitor> {
  return {
    raceId: '',
    seriesCompetitorId: '',
    helm: '',
    crew: '',
    boatClass: '',
    sailnumber: 0,
    handicap: 0,

    /** Results data */
    position: 0,
    points: 0,
    finishTime: 0,
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
