import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RaceDayStore, RaceDayState } from './race-day.store';

@Injectable({ providedIn: 'root' })
export class RaceDayQuery extends QueryEntity<RaceDayState> {

  raceDay$ = this.selectActive();

  constructor(protected store: RaceDayStore) {
    super(store);
  }

}
