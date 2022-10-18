import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, MultiActiveState } from '@datorama/akita';
import { Competitor } from './competitor.model';

export interface ActiveRaces {
  activeRaces: string[];
}

export interface CompetitorState extends EntityState<Competitor, string>, MultiActiveState<string>, ActiveRaces {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'competitor' })
export class CompetitorStore extends EntityStore<CompetitorState> {

  constructor() {
    super();
  }

}
