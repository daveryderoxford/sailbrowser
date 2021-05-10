import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { SeriesCompetitor } from './competitor.model';

export interface CompetitorState extends EntityState<SeriesCompetitor, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'competitor' })
export class CompetitorStore extends EntityStore<CompetitorState> {

  constructor() {
    super();
  }

}
