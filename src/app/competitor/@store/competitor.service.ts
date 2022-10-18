import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Competitor } from './competitor.model';
import { CompetitorState, CompetitorStore } from './competitor.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'clubs/${clubId}/competitors/' })
export class CompetitorService extends CollectionService<CompetitorState> {
  sub: Subscription | undefined = undefined;

  constructor(store: CompetitorStore,
    private clubQuery: ClubsQuery,) {
    super(store);

    // Reset the store if the club changes
    this.clubQuery.selectActiveId().pipe(
      tap(() => {
        this.store?.reset();
      }
    ));
  }

  get path() {
    const clubId = this.clubQuery.getActiveId();
    return `clubs/${clubId}/competitors`;
  }

  async find( seriesId: string, boatId: string): Promise<Competitor> {
    const queryFn = (ref: any) => ref.where('seriesId', '==', seriesId)
                                      .where('boatId', '==', boatId);

    const comps = await this.getValue(queryFn);
    return comps[0];
  }

  /** Sync series competitors from database supports up to a maximum of 10 series */
  syncSeries(seriesIds: string[] ) {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = undefined;
    }
    const queryFn = (ref: any) => ref.where('seriesId', 'in', seriesIds);
    this.sub = this.syncCollection(queryFn).subscribe();
  }

  setActiveRaces( raceIds: string[]) {
    this.store?.update( {activeRaceIds: raceIds});
  }
}
