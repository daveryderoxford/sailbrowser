import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SeriesCompetitor } from './competitor.model';
import { CompetitorState, CompetitorStore } from './competitor.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'clubs/${clubId}/competitors/' })
export class CompetitorService extends CollectionService<CompetitorState> {

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
    return `clubs/${clubId}/competitors/`;
  }

  syncBoat( seriesId: string, boatId: string): Observable<DocumentChangeAction<SeriesCompetitor>[]> {
      const queryFn = (ref: any) => ref.where('seriesId', '== ', seriesId)
                                        .where('boatId', '==', boatId);

      return this.syncCollection(this.path, queryFn);
  }

  async find( seriesId: string, boatId: string): Promise<SeriesCompetitor> {
    const queryFn = (ref: any) => ref.where('seriesId', '== ', seriesId)
                                      .where('boatId', '==', boatId);

    const comps = await this.getValue(queryFn);
    return comps[0];
  }
}



