/** Public types to define scoring for a series.
 *  @see handicap.ts for race position calculation
 */

export type SeriesScoringScheme = 'ISAF2017ShortSeries' | 'ISAF2017LongSeries';

/** Definition for discard scheme bases on number of races  */
export interface DiscardDefinition {
  initialDiscardAfter: number; /** Number of races before the first discard */
  subsequentDiscardsEveryN: number; /** Number of races sailed where a discard will apply thereafter */
}

export type OODScoringAlgorithm = 'AverageSailedRacesIncludingDiscards' | 'AverageSailedRacesExcludingDiscards';

/** Definition of scoring for OOD */
export interface OODScoring {
  algorithm: OODScoringAlgorithm;
  maxPerSeries: number;
}

export interface SeriesScoringData {
  scheme: SeriesScoringScheme;
  ood: OODScoring;
  discards: DiscardDefinition;
}
