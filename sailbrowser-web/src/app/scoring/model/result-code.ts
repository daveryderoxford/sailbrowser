export const RESULT_CODES = [
  'NOT FINISHED',
  'OK',
  'OOD',
  'DNC',
  'DNF',
  'RET',
  'DNS',
  'OCS',
  'ZFP',
  'UFD',
  'BFD',
  'DGM',
  'DSQ',
  'XPA',
  'SCP',
  'RDG',
  'RDGA',
  'RDGB',
  'RDGC',
  'DPI',
] as const;

export type ResultCode = typeof RESULT_CODES[number];

export enum ResultCodeGroup {
  Race = 'race',
  Start = 'start',
  Penalty = 'penalty',
}

export interface ResultCodeDefinition {
  id: ResultCode;
  description: string;
  group: ResultCodeGroup;
  isBasic: boolean;
}

export const RESULT_CODE_DEFINITIONS: Readonly<ResultCodeDefinition[]> = [
  {
    id: 'NOT FINISHED',
    description: 'Competitor has not finished',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  {
    id: 'OK',
    description: 'The competitor completed the race',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  {
    id: 'OOD',
    description: 'Officer of the day',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  {
    id: 'DNC',
    description: 'Did not come to the starting area',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  {
    id: 'DNF',
    description: 'Did not finish the race after starting',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  {
    id: 'RET',
    description: 'Retired the race after starting',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  {
    id: 'DNS',
    description: 'Did not start the race (other than DNC and OCS)',
    group: ResultCodeGroup.Race,
    isBasic: true,
  },
  {
    id: 'OCS',
    description: 'Over line at start or broke rule 30.1 (I Flag)',
    group: ResultCodeGroup.Start,
    isBasic: true,
  },
  {
    id: 'ZFP',
    description: '20% time penalty under rule 30.2 (Z Flag)',
    group: ResultCodeGroup.Start,
    isBasic: false,
  },
  {
    id: 'UFD',
    description: 'Disqualification under rule 30.3 (U Flag)',
    group: ResultCodeGroup.Start,
    isBasic: false,
  },
  {
    id: 'BFD',
    description: 'Disqualification under rule 30.4 (Black Flag)',
    group: ResultCodeGroup.Start,
    isBasic: false,
  },
  {
    id: 'DGM',
    description: 'Non-discardable Black Flag disqualification under rule 30.4.',
    group: ResultCodeGroup.Start,
    isBasic: false,
  },
  {
    id: 'DSQ',
    description: 'Disqualification due to rule infringement',
    group: ResultCodeGroup.Penalty,
    isBasic: true,
  },
  {
    id: 'XPA',
    description: 'Exoneration penalty - Advisory Hearing/RYA Arbitration.',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
  {
    id: 'SCP',
    description: 'Scoring Penalty applied',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
  {
    id: 'RDG',
    description: 'Redress given (hand set)',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
  {
    id: 'RDGA',
    description: 'Redress given - Avg of all races',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
  {
    id: 'RDGB',
    description: 'Redress given - Avg of all Races before',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
  {
    id: 'RDGC',
    description: 'Redress given - Position at incident',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
  {
    id: 'DPI',
    description: 'Discretionary penalty imposed',
    group: ResultCodeGroup.Penalty,
    isBasic: false,
  },
];

export function getResultCodeDefinition(id: ResultCode): ResultCodeDefinition | undefined {
  return RESULT_CODE_DEFINITIONS.find(def => def.id === id);
}
