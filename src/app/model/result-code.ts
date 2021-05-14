/** Results codes as derived from the ISAF with additional codes of OOD */
export type ResultCode =
  'NotFinished' | 'OK' | 'OOD' | 'DNC' | 'DNF' | 'RET' | 'DSQ' | 'DNS' | 'OCS' | 'XPA' | 'ZFP' | 'UFD' | 'BFD' | 'SCP' | 'DNE' | 'RDG' | 'DPI';

export type ResultCodeScoring = 'NA' | 'BoatsInSeries' | 'BoatstoStart'

export interface ResultCodeData {
  label: string;
  description: string;
/*  longSeries: ResultCodeScoring;
  shortSeriesScoring: ResultCodeScoring;
  plus: number;
  discardable: boolean;
  startArea: boolean;
  started: boolean;
  finished: boolean;
  isBasic: boolean; */
}

export const resultCodes = new Map<ResultCode, ResultCodeData>( [
  ['NotFinished', { label: 'Not Finished', description: 'Competitor has not yet finished' }],
  ['OK',  { label: 'OK', description: 'The competitor completed the race'}],
  ['OOD', { label: 'OOD', description: 'Officer of the day ' }],
  ['DNC', { label: 'Did not compete', description: 'Did not come to the starting area' }],
  ['DNF', { label: 'Did not Finish', description: 'Did not finish the race after starting' }],
  ['RET', { label: 'Retired', description: 'Retired the race after starting' }],
  ['OCS', { label: 'On course side', description: 'On course side of starting line at her starting signal and failed to start, or broke rule 30.1 ' }],
  ['DSQ', { label: 'Disqualified', description: 'Disqualification due to rule infrimgement' }],
  ['DNS', { label: 'Did not start', description: ' Did not start (other than DNC and OCS)' }],
  ['XPA', { label: 'Exoneration penalty', description: 'Exoneration penalty as a result of an Advisory Hearing and/or RYA Arbitration.' }],
  ['ZFP', { label: 'ZFP', description: '20% time penalty under rule 30.2 ' }],
  ['UFD', { label: 'UFD', description: 'Disqualification under rule 30.3' }],
  ['BFD', { label: 'BFD', description: 'Disqualification under rule 30.4' }],
  ['SCP', { label: 'Scoring penalty', description: 'Scoring Penalty applied ' }],
  ['DNE', { label: 'Non-excludable disqualification', description: 'Disqualification that is not excludable' }],
  ['RDG', { label: 'Redress given', description: 'Redress given - Set points by hand' }],
  ['DPI', { label: 'Discretionary penalty ', description: 'Discretionary penalty imposed' }],
]);
