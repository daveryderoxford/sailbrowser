import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { ClubsQuery } from 'app/clubs/store/clubs.query';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BoatsState, BoatsStore } from './boats.store';

const queryFn = (ref: any) => ref.orderBy('sailingClass').orderBy('sailNumber');

@Injectable({ providedIn: 'root' })
// @CollectionConfig({ path: 'clubs/:clubId/boats' })
@CollectionConfig({ path: 'boats' })

export class BoatsService extends CollectionService<BoatsState> {

  sub: Subscription | undefined = undefined;

  constructor(store: BoatsStore,
    private clubQuery: ClubsQuery) {
    super(store);

    // When the club changes clear the boats store and resync it.
    this.clubQuery.selectActiveId().pipe(
      tap(() => {
        this.store?.reset();
        if (this.sub) {
          this.sub.unsubscribe();
          this.sub = undefined;
        }
      })
    );
  }

  get path() {
    const clubId = this.clubQuery.getActiveId();
    return `clubs/${clubId}/boats`;
  }

  /** Ensure that the collectino is sychronised.
   *  there is no need to unsibscribe from the collection.
   *  When a new club is connected then it will unsubscribe and
  */
  ensureCollection() {
    if (!this.sub) {
      this.sub = this.syncCollection(queryFn).subscribe();
    }
  }

  setActive(id: string | null) {
    this.store?.setActive(id);
  }
}
