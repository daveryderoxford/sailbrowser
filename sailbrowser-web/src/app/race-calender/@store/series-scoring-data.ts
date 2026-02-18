export const SERIES_SCORING_SCHEMES = ['shortSeries2017', 'longSeries2017'] as const;
export type SeriesScoringScheme = typeof SERIES_SCORING_SCHEMES[number];

export const SeriesScoringSchemeDetails: { name: SeriesScoringScheme, displayName: string }[] = [
   { name: 'shortSeries2017', displayName: 'ISAF 2017 Short Series' },
   { name: 'longSeries2017', displayName: 'ISAF 2017 LongSeries' }
];

export const SERIES_ENTRY_ALGORITHMS = ['classSailNumberHelm', 'classSailNumber', 'helm'] as const;
export type SeriesEntryAlgorithm = typeof SERIES_ENTRY_ALGORITHMS[number];

export const SeriesEntryAlgorithmDetails: { name: SeriesEntryAlgorithm, displayName: string, hint: string }[] = [
   {
      name: 'classSailNumberHelm',
      displayName: 'Class, Sail number, Helm',
      hint: 'Entries for a boat with different helms will be separated',
   },
   {
      name: 'classSailNumber',
      displayName: 'Class, Sail number',
      hint: 'Entries for a boat with different helmms will be merged',
   },
   {
      name: 'helm',
      displayName: 'Helm name',
      hint: 'Entries for helm sailing different boats during series will be merged',
   },
];

export interface SeriesScoringData {
   scheme: SeriesScoringScheme;
   initialDiscardAfter: number;
   subsequentDiscardsEveryN: number;
   entryAlgorithm: SeriesEntryAlgorithm;
}

export const defaultSeriesScoringData: SeriesScoringData = {
   scheme: 'longSeries2017',
   initialDiscardAfter: 3,
   subsequentDiscardsEveryN: 2,
   entryAlgorithm: 'classSailNumberHelm',
};
