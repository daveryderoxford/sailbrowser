/** Handicap calculation data */

import { ResultCode } from 'app/model/result-code';
import { assertExists } from 'app/utilities/misc';

/** Enumeration of supported handicap schemes */
export type RatingSystem = 'LEVEL_RATING' | 'RYA_PY' | 'IRC' | 'RYA_NHC';

/** Data associated with a handicap scheme */
export interface RatingSystemData {
  label: string;
  max: number;
  min: number;
}

/** Map of all possible handicap schemes */
export const ratingSystems = new Map<RatingSystem, RatingSystemData>([
  ['LEVEL_RATING', { label: 'Level Rating', max: 0, min: 0 }],
  ['RYA_PY', { label: 'PY', max: 2000, min: 500 }],
  ['IRC', { label: 'IRC', max: 3.0, min: 0.5 }],
  ['RYA_NHC', { label: 'IRC', max: 3.0, min: 0.5 }],
]);

/** Handicap value  */
export interface Handicap {
  scheme: RatingSystem;
  value: number | undefined;
}

/** Calculates the corrected time taking into account any time penalty */
function calculateCorrectedTime(handicap: Handicap, isAverageLap: boolean, startTime: number, finishTime: number | undefined, laps: number, penalty: ResultCode): number | undefined {

  let result: number | undefined;

  handicap.value = assertExists(handicap.value);

  if (finishTime) {
    let taken = isAverageLap ? finishTime - startTime / laps : finishTime - startTime;

    /** 20% time penalty for ZPF */
    if (penalty === 'ZFP') {
      taken = taken * 1.2;
    }

    if (handicap.scheme === 'RYA_PY') {
      result = taken * 1000 / handicap.value;
    } else if (handicap.scheme === 'IRC' || handicap.scheme === 'RYA_NHC') {
      result = taken / handicap.value;
    }
    result = undefined;
  }
  return result;
}

