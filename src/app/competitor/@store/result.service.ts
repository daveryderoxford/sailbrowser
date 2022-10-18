import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResultStore, ResultState, ResultSortOrder } from './result.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'clubs/${clubId}/results/' })
export class ResultService extends CollectionService<ResultState> {

  sub: Subscription | undefined = undefined;

  constructor(store: ResultStore,
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
      return `clubs/${clubId}/results`;
    }

    syncSeries(seriesIds: string[] ) {
      if (this.sub) {
        this.sub.unsubscribe();
        this.sub = undefined;
      }
      const queryFn = (ref: any) => ref.where('seriesId', 'in', seriesIds);
      this.sub = this.syncCollection(queryFn).subscribe();
    }

    syncRaces(raceIds: string[] ) {
      if (this.sub) {
        this.sub.unsubscribe();
        this.sub = undefined;
      }
      const queryFn = (ref: any) => ref.where('raceId', 'in', raceIds);
      this.sub = this.syncCollection(queryFn).subscribe();
    }

    setActiveRaces( raceIds: string[]) {
      this.store?.update( {activeRaceIds: raceIds});
    }

    addLap( id: string, laps: number, lapTimes: string[]) {
      const time = new Date().toISOString();
      const updateLapTimes = [...lapTimes, ...time ];
      this.update({ laps: laps + 1, lapTimes: updateLapTimes });
    }

    setUISortOrder(sort: ResultSortOrder) {
      this.store?.update( { ui: {sort} } );
    }
}
