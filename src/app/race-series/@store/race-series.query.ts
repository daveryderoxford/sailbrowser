import { Injectable } from '@angular/core';
import { QueryConfig, QueryEntity } from '@datorama/akita';
import { Race } from 'app/model/race';
import { compareAsc } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RaceSeries } from './race-series.model';
import { RaceSeriesState, RaceSeriesStore } from './race-series.store';


const sortBy = (a: RaceSeries, b: RaceSeries, state: RaceSeriesState) => {
  const adate = new Date(a.startDate);
  const bdate = new Date(b.startDate);
  const ret = compareAsc(adate, bdate);
  return ret
};

@Injectable({ providedIn: 'root' })
@QueryConfig({ sortBy })
export class RaceSeriesQuery extends QueryEntity<RaceSeriesState> {

  races$: Observable<Race[]> = this.selectAll().pipe(
    map(() => this.getRaces())
  );

  constructor(protected store: RaceSeriesStore) {
    super(store);
  }

  getActiveRace(): Race | null {
    return this.store.getValue().activeRace;
  }

  getActiveRaceId(): string | null {
    return this.store.getValue().activeRaceId;
  }

  getRaces(): Race[] {
    const ret: Race[] = [];
    for (let series of this.getAll()) {
      ret.push(...series.races)
    }
    return ret
  }
}
