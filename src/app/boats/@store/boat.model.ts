import { Handicap } from 'app/scoring/handicap';

export type BoatType = 'SingleHander' | 'DoubleHander' | 'Cat' | 'DayBoat' | 'Yacht' | 'Windsurfer' | 'Kiteboard' | 'ModelYacht' | 'Other';

export interface BoatTypeData {
  type: BoatType;
  label: string;
}

export const boatTypes: BoatTypeData[] = [
  { type: 'SingleHander', label: 'Single handed dinghy' },
  { type: 'DoubleHander', label: 'Multi handed dinghy' },
  { type: 'Cat', label: 'Cat' },
  { type: 'DayBoat', label: 'DayBoat' },
  { type: 'Yacht', label: 'Yacht' },
  { type: 'Windsurfer', label: 'Windsurfer' },
  { type: 'Kiteboard', label: 'Kiteboard' },
  { type: 'ModelYacht', label: 'ModelYacht' },
  { type: 'Other', label: 'Other' },
];

export interface Boat {
  id: string;
  sailNumber: number;
  sailingClass: string;    /** Name of the class that may be a reference to a class  */
  type: BoatType;          /** Type of the boat */
  name: string;            /** Name of the boat - optional */
  owner: string;           /** Owner of the boat */
  helm: string;            /** Normal helm of the boat if different from the owner */
  crew: string;            /** String of crew names */
  handicaps: Handicap[];   /** Array of handicaps.  The order of the handicaps is the same as the enum order */
  isClubBoat: boolean;     /** Is the boat a club owned boat */
  storageSpace: string;    /** Where the boat is stored */
}

export function createBoat(params: Partial<Boat>) {
  return {
    id: '',
    sailNumber: 0,
    type: 'SingleHander',
    sailingClass: '',
    name: '',
    owner: '',
    helm: '',
    crew: '',
    handicaps: [],
    isClubBoat: false,
    storageSpace: '',
    ...params,
  } as Boat;
}
