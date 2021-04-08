
export type StartSequenceType = 'ISAF' | 'FixedInterval';

export interface StartSequence {
  type: StartSequenceType;
  interval: number;
}
