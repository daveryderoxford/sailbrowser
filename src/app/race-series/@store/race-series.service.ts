import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { Race } from 'app/model/race';
import { compareAsc } from 'date-fns';
import { tap } from 'rxjs/operators';
import { RaceSeries } from './race-series.model';
import { RaceSeriesState, RaceSeriesStore } from './race-series.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'clubs/${clubId}/series' })
export class RaceSeriesService extends CollectionService<RaceSeriesState> {

  constructor(store: RaceSeriesStore,
    private clubQuery: ClubsQuery) {
    super(store);

    // When the club changes clear the boats store and resync it.
    this.clubQuery.selectActiveId().pipe(
      tap(() => {
        this.store?.reset();
        this.syncCollection().subscribe();
        console.log('RaceSeriesService: Sync collection');
      }
      )).subscribe();
  }

  get path() {
    const clubId = this.clubQuery.getActiveId();
    return `clubs/${clubId}/series`;
  }

  /** Sets active series  */
  setActive(id: string | null) {
    this.store?.setActive(id);
  }

  /** Sets the active race */
  setActiveRace(race: Race | null) {
    const id = race ? race.id : null;
    this.store?.update({ activeRace: race, activeRaceId: id });
  }

  private _updateRaces(seriesId: string, races: Race[]) {

    // Sort Races for series into order based on start/end time
    races.sort((a, b) => {
      const adate = new Date(a.scheduledStart);
      const bdate = new Date(b.scheduledStart);
      let result = compareAsc(adate, bdate);
      return result;
    });

    // Set start/end of series.
    let startDate = '';
    let endDate = '';
    if (races.length > 0) {
      startDate = races[0].scheduledStart;
      endDate = races[races.length - 1].scheduledStart;
    }

    const update = {
      races: races,
      startDate: startDate,
      endDate: endDate
    };
    this.update(seriesId, update);
  }

  /**  Adds a race to a series */
  addRace(series: RaceSeries, race: Partial<Race>) {

    if (race.id === '') {
      race.id = guid();
    }
    race.seriesId = series.id;

    const races = [...series.races, race as Race];
    this._updateRaces(series.id, races);
  }

  /** Replaces the complete array of races  */
  addRaces(series: RaceSeries, races: Race[]) {

    races.forEach(race => {
      race.id = guid()
      race.seriesId = series.id;
    });

    this._updateRaces(series.id, races);
  }

  /** Update a races for a series */
  updateRace(series: RaceSeries, updatedId: string, updates: Partial<Race>) {
    const races = series.races.map(original => (updatedId === original.id) ? { ...original, ...updates } : original);
    this._updateRaces(series.id, races);
  }

  /** Remove a race for a series */
  removeRace(series: RaceSeries, deletedId: string) {
    const races = series.races.filter(race => race.id !== deletedId);
    this._updateRaces(series.id, races);
  }

  /** Maintain all series within a period in sychronication */
  syncPeriod(start: Date, end: Date) {
    this.syncCollection(ref => ref.where('startDate', '<=', start).where('endDate', '>=', end));
  }
}
