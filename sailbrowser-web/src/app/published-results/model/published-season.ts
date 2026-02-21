/**
 * Represents a single season's worth of series summaries.
 * This is stored as a document in the `published_seasons` collection,
 * with the document Id being season name
 */
export interface PublishedSeason {
   id: string;
   series: SeriesInfo[];
}

/** A summary of a published series, stored within a `PublishedSeason` document. */
export interface SeriesInfo {
   id: string;
   name: string;
   fleetId: string;
   startDate: Date;
   endDate: Date;
   raceCount: number;
   /** The ID of the document in the `published_series_results` collection. */
   seriesId: string;
}