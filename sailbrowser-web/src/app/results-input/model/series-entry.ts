export interface SeriesEntry {
   id: string;
   seriesId: string;

   helm: string;
   crew?: string;
   club?: string;

   boatClass: string;
   sailNumber: string;
   handicap: number;
}
