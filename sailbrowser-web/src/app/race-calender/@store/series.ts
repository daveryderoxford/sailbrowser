
export interface Series {
   id: string;
   season: string;
   name: string;
   fleetId: string;
   startDate?: Date;
   endDate?: Date;
   archived: boolean;
   scoringScheme: unknown; // TODO: Define SeriesScoringData
}