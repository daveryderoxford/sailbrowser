import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Race } from 'app/model/race';
import { RaceSeriesQuery } from 'app/race-series/@store/race-series.query';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { RaceDay, Start } from './race-day.model';
import { RaceDayState, RaceDayStore } from './race-day.store';

export interface RaceDayWithRaces  {
  start: Start;
  races: Race[];
}

function mapSeries(raceDay: RaceDay | undefined, races: Race[]): RaceDayWithRaces[] {
  const s: any = [];
  if (!raceDay) return [];
  for (const start of raceDay.starts) {
    let startRaces = start.raceIds.map(id => races.find(r => r.id === id));
    s.push({start: start, races: startRaces});
  }
  return (s);
}

@Injectable({ providedIn: 'root' })
export class RaceDayQuery extends QueryEntity<RaceDayState> {

  raceDay$ = this.selectActive();

  constructor(protected store: RaceDayStore,
    private raceSeriesQuery: RaceSeriesQuery) {
    super(store);
  }

  raceDayWithRaces$ = combineLatest([this.raceDay$, this.raceSeriesQuery.races$]).pipe(
    map(([raceDay, races]) => mapSeries(raceDay, races))
  )

}
