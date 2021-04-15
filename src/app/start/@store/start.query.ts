import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StartStore, StartState } from './start.store';

@Injectable({ providedIn: 'root' })
export class StartQuery extends QueryEntity<StartState> {

  constructor(protected store: StartStore) {
    super(store);
  }

}
