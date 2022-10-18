import { ResultCode } from 'app/scoring/result-code';

export interface CompetitorDetails {
  helm: string;                /** Helm is a single person */
  crew: string;                /** Array of crew names */
  boatClass: string;           /** This will be used to match the class name in the classes */
  sailNumber: number;          /** Sail number */
  handicap: number;            /** Handicap value  (for handicap) */
}


export interface Competitor extends CompetitorDetails {
  id: string;
  seriesId: string;      /** Series entry this race entry is part of */
  boatId: string;        /** Id of boat in boat list *
  results: string[];           /** Result Id's for the race */
}

export const createCompetitor = (params: Partial<Competitor>) => ({
    id: '',
    seriesId: '',
    boatId: '',
    helm: '',
    crew: '',
    boatClass: '',
    sailNumber: 0,
    handicap: 0,
    results: [],
    ...params
  });


