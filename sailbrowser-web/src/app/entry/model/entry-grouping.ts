export const SERIES_ENTRY_GROUPING = ['classSailNumberHelm', 'classSailNumber', 'helm', 'regatta'] as const;

/** 
 * How race entries are grouped to form series entries. 
 * For a 'regatta' all entrants will be considered to the series entrants
 * For club racing,  Series results will be derived from race entrants based 
 * on combinations of class/sail number/helm.
 */
export type SeriesEntryMatchingStrategy = typeof SERIES_ENTRY_GROUPING[number];

export const seriesEntryMatchingStrategys: { name: SeriesEntryMatchingStrategy, displayName: string, hint: string; }[] = [
  {
    name: 'classSailNumberHelm',
    displayName: 'Class, Sail number, Helm',
    hint: 'Strictly match ',
  },
  {
    name: 'classSailNumber',
    displayName: 'Class, Sail number',
    hint: 'Entries for a boat with different helmms will be merged',
  },
  {
    name: 'helm',
    displayName: 'Helm name',
    hint: 'Entries for helm sailing different boats during series will be merged',
  },
];
