
export const HANDICAP_SCHEMES = [
  "Level Rating", 
  "PY"
 ] as const;

export type HandicapScheme = typeof HANDICAP_SCHEMES[number];
