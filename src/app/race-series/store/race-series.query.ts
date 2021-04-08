import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Race } from 'app/model/race';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RaceSeries } from './race-series.model';
import { RaceSeriesState, RaceSeriesStore } from './race-series.store';

@Injectable({ providedIn: 'root' })
export class RaceSeriesQuery extends QueryEntity<RaceSeriesState> {

  races$: Observable<Race[]> = this.selectAll().pipe(
    map( allSeries => allSeries.map( series => series.races).reduce( (acc, races) => {
      return acc.push(...races ), []
    })
  ));

  constructor(protected store: RaceSeriesStore) {
    super(store);
  }

  getActiveRace(): Race | null {
    return this.store.getValue().activeRace;
  }

  getActiveRaceId(): string | null {
    return this.store.getValue().activeRaceId;
  }

}

