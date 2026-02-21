
export const RACE_TYPES = [
   'Conventional',
   'Pursuit',
] as const;

export type RaceType = typeof RACE_TYPES[number];
