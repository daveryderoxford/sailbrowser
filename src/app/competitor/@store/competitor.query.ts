import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CompetitorStore, CompetitorState } from './competitor.store';

@Injectable({ providedIn: 'root' })
export class CompetitorQuery extends QueryEntity<CompetitorState> {

  constructor(protected store: CompetitorStore) {
    super(store);
  }

}
