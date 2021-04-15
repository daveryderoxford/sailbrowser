import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { interval } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { SystemDataStore, SystemDataState } from './system-data.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'system-data' })
export class SystemDataService extends CollectionService<SystemDataState> {

  constructor(store: SystemDataStore) {
    super(store);

    // Sychronise the system data on startup
    this.syncDoc({id: 'system_date'}).pipe(
      take(1)
    ).subscribe();

    // ...and refresh once per day
    interval(24*60*60*1000).pipe(
      switchMap( () => this.syncDoc({id: 'system_data'})),
    ).subscribe();
  }
}
