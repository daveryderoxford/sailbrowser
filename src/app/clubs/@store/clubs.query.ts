import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BoatClass } from 'app/model/boat-class';
import { Fleet } from 'app/model/fleet';
import { Club } from './club.model';
import { ClubsState, ClubsStore } from './clubs.store';

@Injectable({ providedIn: 'root' })
export class ClubsQuery extends QueryEntity<ClubsState> {

  activeClub: Club = this.getActive() as Club;

  boatClasses: BoatClass[] = this.activeClub.boatClasses;

  fleets: Fleet[] = this.activeClub.fleets;

  constructor(protected store: ClubsStore) {
    super(store);
  }

  fleet(id: string): Fleet | undefined {
    return this.fleets.find( fleet => id === fleet.id);
  }

}
