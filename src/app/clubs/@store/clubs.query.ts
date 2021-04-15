import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Fleet } from 'app/model/fleet';
import { ClubsStore, ClubsState } from './clubs.store';

@Injectable({ providedIn: 'root' })
export class ClubsQuery extends QueryEntity<ClubsState> {

  constructor(protected store: ClubsStore) {
    super(store);
  }

  fleets: Fleet[] = this.getActive()!.fleets;

  fleet(id: string): Fleet | undefined {
    return this.fleets.find( fleet => id === fleet.id) ;
  }

}
