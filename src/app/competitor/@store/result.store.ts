import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Result } from './result.model';

export interface ActiveRaces {
  activeRaces: string[];
}

export type ResultSortOrder = 'fleet' | 'expected';

export interface ResultState extends EntityState<Result, string>, ActiveState<string>, ActiveRaces {
    ui: {
      sort: ResultSortOrder;
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'results' })
export class ResultStore extends EntityStore<ResultState> {

  constructor() {
    super();
  }

}
