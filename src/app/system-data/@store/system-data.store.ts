import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { SystemData } from './system-data.model';

export interface SystemDataState extends EntityState<SystemData, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'systemData' })
export class SystemDataStore extends EntityStore<SystemDataState> {

  constructor() {
    super();
  }

}
