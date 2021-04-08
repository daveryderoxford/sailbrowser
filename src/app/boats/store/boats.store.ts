import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Boat } from './boat.model';

export interface BoatsState extends EntityState<Boat, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'boats' })
export class BoatsStore extends EntityStore<BoatsState> {

  constructor() {
    super();
  }

}
