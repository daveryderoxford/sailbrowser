export const SERIES_SCORING_SCHEMES = ['short', 'long'] as const;
export type SeriesScoringScheme = typeof SERIES_SCORING_SCHEMES[number];

export const seriesScoringSchemeDetails: { name: SeriesScoringScheme, displayName: string; }[] = [
  { name: 'short', displayName: 'ISAF 2017 Short Series' },
  { name: 'long', displayName: 'ISAF 2017 LongSeries' }
];