import { Boat } from 'app/boats/index';

export interface Profile {
  displayName: string;
  email: string;
  boats: Boat[];
}

export interface User {
  boats: Boat[];
}

export function createProfile(profile: Partial<Profile>): Profile {
  return {
    displayName: '',
    email: '',
    boats: [],
    ...profile
  };
}
