import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { Club } from 'app/clubs/@store/club.model';
import { Race } from 'app/model/race';
import { RaceSeries } from 'app/race-series/@store/race-series.model';
import { RaceSeriesQuery } from 'app/race-series/@store/race-series.query';
import { RaceSeriesService } from 'app/race-series/@store/race-series.service';
import { add } from 'date-fns';
import { RaceDayStore, RaceDayState } from './race-day.store';

// Sort based on the order of fleets for the club
function sort( r: Race, s: RaceSeries, c: Club) {

}

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'race-days' })
export class RaceDayService extends CollectionService<RaceDayState> {

  constructor(store: RaceDayStore,
    private raceSeriesService: RaceSeriesService,
    private raceSeriesQuery: RaceSeriesQuery) {
    super(store);
  }

  create( day: Date) {
    // Load series for day

    this.raceSeriesService.syncPeriod(day, add(day, {days: 1}));

    // Find races on specified day
    let allRaces: Race[] = [];
    const series = this.raceSeriesQuery.getAll();

    for (let s of series) {
      const races = s.races.filter( race => race.scheduledStart === day.toISOString());
      allRaces.push(...races);
    }

    // Allocate races to starts.  Allocated to same start if scheduled data time





  }

}
