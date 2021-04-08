import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ClubsStore, ClubsState } from './clubs.store';

@Injectable({ providedIn: 'root' })
export class ClubsQuery extends QueryEntity<ClubsState> {

  constructor(protected store: ClubsStore) {
    super(store);
  }

}
