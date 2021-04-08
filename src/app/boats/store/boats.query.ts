import { Injectable } from '@angular/core';
import { QueryConfig, QueryEntity } from '@datorama/akita';
import { Boat } from '..';
import { BoatsState, BoatsStore } from './boats.store';

const sortBy = (a: Boat, b: Boat) => {
  const ca = a.sailingClass.toLowerCase();
  const cb = b.sailingClass.toLowerCase();

  if (ca !== cb) {
    return ca < cb ? -1 : 1;
  } else {
    return a.sailNumber < b.sailNumber ? -1 : 1;
  }
};

@Injectable({ providedIn: 'root' })
@QueryConfig({ sortBy })
export class BoatsQuery extends QueryEntity<BoatsState> {

  constructor(protected store: BoatsStore) {
    super(store);
  }
}
