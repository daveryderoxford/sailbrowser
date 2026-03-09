
export const RESULT_CODES = [
  'OK', 'DNC', 'DNS', 'DNF', 'RET', 'OCS', 'BFD', 'NSC', 'UFD', 'DSQ',
  'DNE', 'DGM', 'RDG', 'RDGA', 'RDGB', 'RDGC', 'OOD', 'ZFP',
  'SCP', 'XPA', 'DPI', 'NOT FINISHED'
] as const;

export type ResultCode = (typeof RESULT_CODES)[number];

/**
 * The algorthim to use in calculating the points for a code. 
 */
export enum ResultCodeAlgorithm {
  na = 'na',
  compInSeries = 'compInSeries',      // N + 1 (Total Entries in Series)
  compInStartArea = 'compInStartArea', // N + 1 (Boats that came to the start area)
  avgAll = 'avgAll',                  // Average of all races in series
  avgBefore = 'avgBefore',            // Average of races prior to this one
  scoringPenalty = 'scoringPenalty',  // Numerical finish + % of fleet (RRS 44.3)
  setByHand = 'setByHand'             // Manual point override
}

/**
 * Code Groups
 */
const NOT_IN_START_AREA: ResultCode[] = ['DNC', 'OOD', 'NOT FINISHED'];
const NO_LEGAL_FINISH: ResultCode[] = [
  'DNC', 'DNS', 'DNF', 'RET', 'OCS',
  'BFD', 'UFD', 'DSQ', 'DNE', 'NOT FINISHED',
];
const REDRESS: ResultCode[] = [
  'RDG', 'RDGA', 'RDGB', 'OOD'
];
const NON_DISCARDABLE: ResultCode[] = ['DGM', 'DNE'];

// Whan calculating averages, excluded all codes that dont 
// reflect the competitors performance. Per RRS A9, this should be
// scores from races the boat started and finished.
const FINISHED_AND_SCORED: ResultCode[] = ['OK', 'SCP', 'DPI'];

/**
 * 3. PREDICATES (Public API)
 */
export const isStartAreaComp = (code: ResultCode) => !NOT_IN_START_AREA.includes(code);
export const isFinishedComp = (code: ResultCode) => !NO_LEGAL_FINISH.includes(code);
export const isRedress = (code: ResultCode) => REDRESS.includes(code);
export const isDiscardable = (code: ResultCode) => !NON_DISCARDABLE.includes(code);

export const requiresTime = (code: ResultCode) => FINISHED_AND_SCORED.includes(code);

/**
 * 4. ALGORITHM RESOLVERS (Public API)
 */
export const getShortAlgorithm = (code: ResultCode): ResultCodeAlgorithm => {
  if ((['RDGA', 'OOD'] as ResultCode[]).includes(code)) return ResultCodeAlgorithm.avgAll;
  if (code === 'RDGB') return ResultCodeAlgorithm.avgBefore;
  if ((['ZFP', 'SCP', 'XPA'] as ResultCode[]).includes(code)) return ResultCodeAlgorithm.scoringPenalty;
  if ((['DPI', 'RDG', 'RDGC'] as ResultCode[]).includes(code)) return ResultCodeAlgorithm.setByHand;
  if (code === 'OK') return ResultCodeAlgorithm.na;

  return ResultCodeAlgorithm.compInSeries;
};

export const getLongAlgorithm = (code: ResultCode): ResultCodeAlgorithm => {
  const short = getShortAlgorithm(code);

  // Rule A5.3 (Long Series): DNS/DNF/OCS points based on Starters + 1
  if (short === ResultCodeAlgorithm.compInSeries && isStartAreaComp(code)) {
    return ResultCodeAlgorithm.compInStartArea;
  }
  return short;
};

/** Include result in average pool if RRS Appendix A9 (a) and (b) */
export function includeInAveragePool(code: ResultCode): boolean {
  const algo = getShortAlgorithm(code);
  const isAvgType = [ResultCodeAlgorithm.avgAll, ResultCodeAlgorithm.avgBefore].includes(algo);
  return FINISHED_AND_SCORED.includes(code) && !isAvgType;
}
