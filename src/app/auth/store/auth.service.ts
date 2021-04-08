import { Injectable } from '@angular/core';
import { FireAuthService, CollectionConfig } from 'akita-ng-fire';
import { Profile } from './auth.model';
import { AuthStore, AuthState } from './auth.store';
import firebase from 'firebase/app';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users' })
export class AuthService extends FireAuthService<AuthState> {

  constructor(store: AuthStore) {
    super(store);
  }

  createProfile(user: firebase.User, ctx: any): Partial<Profile> {
    return {
      email: user.email as string,
      displayName: user.displayName as string,
      boats: [],
    };
  }

  formatFromFirestore(user: Profile) {
    return user;
  }

  onCreate() {
    console.log('Logged from onCreate hook');
  }

  onDelete() {
    console.log('Logged from onDelete hook');
  }

  onUpdate() {
    console.log('Logged from onUpdate hook');
  }

  onSignup() {
    console.log('Logged from onSignup hook');
  }

  onSignin() {
    console.log('Logged from onSignin hook');
  }

  onSignout() {
    console.log('You have been signed out. Logged from onSignout hook');
  }
}
