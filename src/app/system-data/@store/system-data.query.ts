import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SystemData } from './system-data.model';
import { SystemDataStore } from './system-data.store';

@Injectable({ providedIn: 'root' })
export class SystemDataQuery extends Query<SystemData> {

  boatClasses = this.getValue().boatClasses;

  constructor(protected store: SystemDataStore) {
    super(store);
  }
}
