export const SERIES_SCORING_SCHEMES = ['shortSeries2017', 'longSeries2017'] as const;
export type SeriesScoringScheme = typeof SERIES_SCORING_SCHEMES[number];

export const seriesScoringSchemeDetails: { name: SeriesScoringScheme, displayName: string; }[] = [
  { name: 'shortSeries2017', displayName: 'ISAF 2017 Short Series' },
  { name: 'longSeries2017', displayName: 'ISAF 2017 LongSeries' }
];