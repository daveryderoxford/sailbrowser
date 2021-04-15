import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { testClub } from './club.model';
import { ClubsState, ClubsStore } from './clubs.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'clubs' })
export class ClubsService extends CollectionService<ClubsState> {

  constructor(store: ClubsStore) {
    super(store);

    // Just use default club for now
    console.log(' clubs.service Just using atest club for now automatically set active');
    const club = testClub();
    this.upsert(club);
    this.store?.add(club);
    this.store?.setActive(club.id);
  }

  setActive( id: string | null) {
    this.store?.setActive(id);
  }
}
