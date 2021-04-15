import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Start } from './start.model';

export interface StartState extends EntityState<Start> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'start' })
export class StartStore extends EntityStore<StartState> {

  constructor() {
    super();
  }

}
