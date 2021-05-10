import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { RaceDay } from './race-day.model';

export interface RaceDayState extends EntityState<RaceDay, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'race-day' })
export class RaceDayStore extends EntityStore<RaceDayState> {

  constructor() {
    super();
    
  }

}
