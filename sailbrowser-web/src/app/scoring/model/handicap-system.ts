
export const HANDICAP_SYSTEMS = [
  "Level Rating", 
  "PY",
  "IRC"
 ] as const;

 /** Handicap system used to hamdicap between different boat types */
export type HandicapSystem = typeof HANDICAP_SYSTEMS[number];
