import { SeriesEntryMatchingStrategy } from '../../entry/model/entry-grouping';
import { HandicapScheme } from './handicap-scheme';
import { SeriesScoringScheme } from './scoring-algotirhm';

/** Configuration for scoring series and race */
export interface ScoringConfiguration {
  handicapScheme: HandicapScheme;
  scheme: SeriesScoringScheme;
  initialDiscardAfter: number;
  subsequentDiscardsEveryN: number;
  entryAlgorithm: SeriesEntryMatchingStrategy;
}

export const defaultSeriesScoringData: ScoringConfiguration = {
  handicapScheme: 'PY',
  scheme: 'long',
  initialDiscardAfter: 3,
  subsequentDiscardsEveryN: 2,
  entryAlgorithm: 'classSailNumberHelm',
};

