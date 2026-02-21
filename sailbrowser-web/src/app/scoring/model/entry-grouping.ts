export const SERIES_ENTRY_GROUPING = ['classSailNumberHelm', 'classSailNumber', 'helm', 'regatta'] as const;

/** 
 * How race entries are grouped to form series entries. 
 * For a 'regatta' all entrants will be considered to the series entrants
 * For club racing,  Series results will be derived from race entrants based 
 * on combinations of class/sail number/helm.
 */
export type SeriesEntryGrouping = typeof SERIES_ENTRY_GROUPING[number];

export const seriesEntryGroupingDetails: { name: SeriesEntryGrouping, displayName: string, hint: string; }[] = [
  {
    name: 'classSailNumberHelm',
    displayName: 'Class, Sail number, Helm',
    hint: 'Entries for a boat with different helms will be separated',
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
  {
    name: 'regatta',
    displayName: 'Regatta',
    hint: 'All enttants to the regatta will be entered into the series',
  },
];