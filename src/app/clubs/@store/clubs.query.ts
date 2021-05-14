import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BoatClass } from 'app/model/boat-class';
import { Fleet } from 'app/model/fleet';
import { ClubsState, ClubsStore } from './clubs.store';

@Injectable({ providedIn: 'root' })
export class ClubsQuery extends QueryEntity<ClubsState> {

  boatClasses: BoatClass[] = this.getActive()!.boatClasses;

  constructor(protected store: ClubsStore) {
    super(store);
  }

  fleets: Fleet[] = this.getActive()!.fleets;

  fleet(id: string): Fleet | undefined {
    return this.fleets.find( fleet => id === fleet.id);
  }


}
