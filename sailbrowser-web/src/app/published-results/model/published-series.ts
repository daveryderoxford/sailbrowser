import { ResultCode } from 'app/scoring/model/result-code';

/** Represents published results for a series
 */
export interface PublishedSeries {
   id: string;
   name: string;
   fleetId: string;
   competitors: PublishedSeriesResult[];
}

export interface PublishedSeriesResult {
   helm: string;
   crew?: string;
   sailNumber: number;
   club: string;
   boatClass: string;
   handicap: number;
   raceScores: {
      raceIndex: number;
      points: number;
      resultCode: ResultCode;
      isDiscard: boolean;
   }[];
   totalPoints: number;
   netPoints: number;
   rank: number;
   scoresForTiebreak: number[];
}
