import { SeriesEntryGrouping } from './entry-grouping';
import { HandicapSystem } from './handicap-system';
import { SeriesScoringScheme } from './scoring-algotirhm';

/** Configuration for scoring series and race */
export interface ScoringConfiguration {
  handicapSystem: HandicapSystem;
  scheme: SeriesScoringScheme;
  initialDiscardAfter: number;
  subsequentDiscardsEveryN: number;
  entryAlgorithm: SeriesEntryGrouping;
}

export const defaultSeriesScoringData: ScoringConfiguration = {
  handicapSystem: 'PY',
  scheme: 'longSeries2017',
  initialDiscardAfter: 3,
  subsequentDiscardsEveryN: 2,
  entryAlgorithm: 'classSailNumberHelm',
};

