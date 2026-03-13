import { SeriesEntryMatchingStrategy } from '../../entry/model/entry-grouping';
import { HandicapSystem } from './handicap-system';
import { SeriesScoringScheme } from './scoring-algotirhm';

/** Configuration for scoring series and race */
export interface ScoringConfiguration {
  handicapSystem: HandicapSystem;
  scheme: SeriesScoringScheme;
  initialDiscardAfter: number;
  subsequentDiscardsEveryN: number;
  entryAlgorithm: SeriesEntryMatchingStrategy;
}

export const defaultSeriesScoringData: ScoringConfiguration = {
  handicapSystem: 'PY',
  scheme: 'long',
  initialDiscardAfter: 3,
  subsequentDiscardsEveryN: 2,
  entryAlgorithm: 'classSailNumberHelm',
};

