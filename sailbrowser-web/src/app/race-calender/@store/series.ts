import { SeriesScoringData } from 'app/race-calender/@store/series-scoring-data';

export interface Series {
   id: string;
   season: string;
   name: string;
   fleetId: string;
   startDate?: Date;
   endDate?: Date;
   archived: boolean;
   scoringScheme: SeriesScoringData;
}