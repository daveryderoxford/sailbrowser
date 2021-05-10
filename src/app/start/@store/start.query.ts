import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { StartStore, StartState } from './start.store';

@Injectable({ providedIn: 'root' })
export class StartQuery extends Query<StartState> {

  constructor(protected store: StartStore) {
    super(store);
  }
}
