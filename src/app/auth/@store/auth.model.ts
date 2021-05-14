import { Boat } from 'app/boats/index';

export interface Profile {
  displayName: string;
  email: string;
  boats: Boat[];
}

export interface User {
  boats: Boat[];
}

export const createProfile = (profile: Partial<Profile>): Profile => ({
    displayName: '',
    email: '',
    boats: [],
    ...profile
  });
