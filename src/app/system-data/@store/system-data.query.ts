import { Injectable } from '@angular/core';
import { Query, QueryEntity } from '@datorama/akita';
import { RatingSystem } from 'app/scoring/handicap';
import { SystemData } from './system-data.model';
import { SystemDataStore } from './system-data.store';

@Injectable({ providedIn: 'root' })
export class SystemDataQuery extends Query<SystemData> {

  constructor(protected store: SystemDataStore) {
    super(store);
  }

  boatClasses = this.getValue().boatClasses;

}
