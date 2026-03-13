
export const HANDICAP_SCHEMES = [
  "Level Rating", 
  "PY",
  'IRC',
  'Personal'
 ] as const;

 /** Handicap system used to hamdicap between different boat types */
export type HandicapScheme = typeof HANDICAP_SCHEMES[number];
