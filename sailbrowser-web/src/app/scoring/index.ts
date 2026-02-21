export type { SeriesEntryGrouping } from './model/entry-grouping';
export { SERIES_ENTRY_GROUPING, seriesEntryGroupingDetails } from './model/entry-grouping';

export type { HandicapSystem } from './model/handicap-system';
export { HANDICAP_SYSTEMS } from './model/handicap-system';

export type { ResultCode, ResultCodeDefinition } from './model/result-code';
export { RESULT_CODES, isStarter, isFinishedComp, ResultCodeGroup, RESULT_CODE_DEFINITIONS, getResultCodeDefinition } from './model/result-code';

export type { SeriesScoringScheme } from './model/scoring-algotirhm';
export { SERIES_SCORING_SCHEMES, seriesScoringSchemeDetails } from './model/scoring-algotirhm';

export type { ScoringConfiguration } from './model/scoring-configuration';
export { defaultSeriesScoringData } from './model/scoring-configuration';

// Services
export { score } from './services/scorer';

