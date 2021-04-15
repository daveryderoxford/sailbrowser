import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Club } from './club.model';

export interface ClubsState extends EntityState<Club, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'clubs' })
export class ClubsStore extends EntityStore<ClubsState> {

  constructor() {
    super();
  }

}
