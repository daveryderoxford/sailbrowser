import { sharedStylesheetJitUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Order, QueryEntity } from '@datorama/akita';
import { ScoringSchemePipe } from 'app/shared/pipes/scoring-scheme.pipe';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { Competitor } from './competitor.model';
import { CompetitorState, CompetitorStore } from './competitor.store';

@Injectable({ providedIn: 'root' })
export class CompetitorQuery extends QueryEntity<CompetitorState> {

  constructor(protected store: CompetitorStore) {
    super(store);
  }

}
