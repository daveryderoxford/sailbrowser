import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { SystemData } from './system-data.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'systemData' })
export class SystemDataStore extends Store<SystemData> {

  constructor() {
    super({ boatClasses: [] });
  }

}
