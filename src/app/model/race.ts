/** Race */

export type RaceState =  'Future' | 'InProgress' | 'Canceled' |  'Postponed' |  'Completed' | 'Published';

interface RaceStateData {
  label: string;
  description: string;
}

export type RaceStartType = 'Conventional' | 'Pursuit';

export const raceStates = new Map<string, RaceStateData>([
  ['Future', {label: 'Future', description: '' }],
  ['InProgress', {label: 'In progress', description: '' }],
  ['Canceled', {label: 'Canceled', description: '' }],
  ['Postponed', {label: 'Postponed', description: '' }],
  ['Completed', {label: 'Completed', description: '' }],
  ['Published', {label: 'Published', description: '' }],
]);

export interface  Race  {
  id: string;
  seriesId: string;           /** ID of series the race is part of */
  name: string;
  fleetId: string;
  scheduledStart: string;      /** Date the race was scheduled in ISO format */
  actualStart: string;    /** Time the race was actually started */
  startType: RaceStartType;   /** Line start of pursuit */
  status: RaceState;          /** Status of the race.  Identifies if the race is running and if results have been published */
  isDiscardable: boolean;     /** Can the race be discarded */
  startNumber: number;        /** Start order number  */
}
