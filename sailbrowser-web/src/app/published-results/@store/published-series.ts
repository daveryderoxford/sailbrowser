
export interface PublishedSeries {
   id: string;
   season: string;
   name: string;
   fleetId: string;
   startDate?: Date;
   endDate?: Date;
   archived: boolean;
}
