import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Race } from 'app/model/race';
import { RaceSeries } from './race-series.model';

interface ActiveRace {
  activeRaceId: string | null;
  activeRace: Race | null;
}

export interface RaceSeriesState extends EntityState<RaceSeries, string>, ActiveState<string>, ActiveRace {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'race-series' })
export class RaceSeriesStore extends EntityStore<RaceSeriesState> {

  constructor() {
    super();
  }

}
