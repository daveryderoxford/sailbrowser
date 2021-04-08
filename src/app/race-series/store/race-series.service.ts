import { Injectable } from '@angular/core';
import { guid } from '@datorama/akita';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { ClubsQuery } from 'app/clubs/store/clubs.query';
import { Race } from 'app/model/race';
import { compareAsc } from 'date-fns';
import { tap } from 'rxjs/operators';
import { createRace, createSeries, RaceSeries } from './race-series.model';
import { RaceSeriesQuery } from './race-series.query';
import { RaceSeriesState, RaceSeriesStore } from './race-series.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'clubs/${clubId}/series' })
export class RaceSeriesService extends CollectionService<RaceSeriesState> {

  testSeries: RaceSeries = createSeries({
    id: '123abc',
    name: 'Summer',
    fleet: 'Fast Handicap',
    startDate: '2020-01-01',
    endDate: '2020-03-01',
    races: [
      createRace({ id: 'race1', seriesId: '123abc', scheduledStart: '2020-01-01', }),
      createRace({ id: 'race2', seriesId: '123abc', scheduledStart: '2020-01-01', }),
      createRace({ id: 'race3', seriesId: '123abc', scheduledStart: '2020-02-01', }),
      createRace({ id: 'race4', seriesId: '123abc', scheduledStart: '2020-02-01', }),
      createRace({ id: 'race5', seriesId: '123abc', scheduledStart: '2020-03-01', }),
      createRace({ id: 'race6', seriesId: '123abc', scheduledStart: '2020-03-01', }),
    ]
  });

  constructor(store: RaceSeriesStore,
    private clubQuery: ClubsQuery,
    private seriesQuery: RaceSeriesQuery) {
    super(store);

    // When the club changes clear the boats store and resync it.
    this.clubQuery.selectActiveId().pipe(
      tap(() => {
        this.store?.reset();
        this.syncCollection().subscribe();
      }
      ));

    // this.store?.add(this.testSeries);
    // this.store?.setActive(this.testSeries.id);

  }

  get path() {
    const clubId = this.clubQuery.getActiveId();
    return `clubs/${clubId}/series`;
  }

  /** Sets active series  */
  setActive(id: string | null) {
    this.store?.setActive(id);
  }

  /** Sets the active race on the */
  setActiveRace(race: Race | null) {
    const id = race ? race.id : null;
    this.store?.update({ activeRace: race, activeRaceId: id });
  }

  private _updateRaces(seriesId: string, races: Race[]) {

    // Sort Races into order based on start/end time.
    races.sort((a, b) => {
      const adate = new Date(a.scheduledStart);
      const bdate = new Date(b.scheduledStart);
      return compareAsc(adate, bdate);
    });

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

  /** Update a races for a series */
  updateRace(series: RaceSeries, updatedId: string, updated: Partial<Race>) {
    const races = series.races.map(original => (updatedId === original.id) ? { ...original, ...updated } : original);
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
