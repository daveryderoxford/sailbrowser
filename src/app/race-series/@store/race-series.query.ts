import { Injectable } from '@angular/core';
import { QueryConfig, QueryEntity } from '@datorama/akita';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
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
    map(() => this.getAllRaces())
  );

  constructor(protected store: RaceSeriesStore,
    protected clubQuery: ClubsQuery) {
    super(store);
  }

  getActiveRace(): Race | null {
    return this.store.getValue().activeRace;
  }

  getActiveRaceId(): string | null {
    return this.store.getValue().activeRaceId;
  }

  getAllRaces(): Race[] {
    const ret: Race[] = [];
    for (let series of this.getAll()) {
      ret.push(...series.races)
    }
    ret.sort((a, b) => this.sortRaces(a, b))
    return ret
  }

  private sortRaces(a: Race, b: Race) {
    const adate = new Date(a.scheduledStart);
    const bdate = new Date(b.scheduledStart);
    const ret = compareAsc(adate, bdate);
    if (ret !== 0) {
      return ret
    } else {
      const index1 = this.clubQuery.fleets.findIndex(f => f.id === a.fleetId);
      const index2 = this.clubQuery.fleets.findIndex(f => f.id === b.fleetId);
      return index1 - index2;
    }
  }
}
