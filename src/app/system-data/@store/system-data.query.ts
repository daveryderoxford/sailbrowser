import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RatingSystem } from 'app/scoring/handicap';
import { SystemDataStore, SystemDataState } from './system-data.store';

@Injectable({ providedIn: 'root' })
export class SystemDataQuery extends QueryEntity<SystemDataState> {

  constructor(protected store: SystemDataStore) {
    super(store);
  }

  boatclasses = this.getActive()?.boatclasses;

  handicap( className: string, scheme: RatingSystem ): number | undefined {
    return this.boatclasses?.find( c => c.name )?.handicaps.find( s => s.scheme === scheme)?.value;
  }

}
