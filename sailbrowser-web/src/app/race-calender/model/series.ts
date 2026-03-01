import { ScoringConfiguration } from 'app/scoring';

export interface Series {
   id: string;
   seasonId: string;
   name: string;
   fleetId: string;
   startDate?: Date;
   endDate?: Date;
   archived: boolean;
   scoringScheme: ScoringConfiguration;
}