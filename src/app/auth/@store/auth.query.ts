import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '..';
import { AuthStore, AuthState } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {

  profile$ = this.select('profile');
  isLoggedIn$ = this.profile$.pipe(map(value => !!value?.email));

  constructor(protected store: AuthStore) {
    super(store);
  }


}
