import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Race } from 'app/model/race';
import { RaceSeries } from './race-series.model';

interface ActiveRace {
  activeRaceId: string | null;
  activeRace: Race | null;
}

interface CurrentRaces {
  currentRaces: Race[];
}

function setRaceDenormalisedData( series: RaceSeries): RaceSeries {
  const races = series.races.map( (race, index) => {
    race.name = series.name + ' ' + (index+1).toString();
    race.fleetId = series.fleetId;
    return race;
  });

  return { ...series, races: races };
}


export interface RaceSeriesState extends EntityState<RaceSeries, string>, ActiveState<string>, ActiveRace, CurrentRaces {}

const initialState: Partial<RaceSeriesState> = {
  currentRaces: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'race-series' })
export class RaceSeriesStore extends EntityStore<RaceSeriesState> {

  constructor() {
    super(initialState);
    this.akitaPreUpdateEntity = this.akitaPreUpdateEntity.bind(this);
    this.akitaPreUpdateEntity = this.akitaPreUpdateEntity.bind(this);
  }

  akitaPreAddEntity(series: RaceSeries): RaceSeries {
   return setRaceDenormalisedData( series );
  }

  akitaPreUpdateEntity(prevSeries: RaceSeries, nextSeries: RaceSeries) {
    return setRaceDenormalisedData( nextSeries );
  }
}
