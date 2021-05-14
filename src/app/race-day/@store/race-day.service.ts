import { Injectable } from '@angular/core';
import { CollectionService } from 'akita-ng-fire';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { Race } from 'app/model/race';
import { RaceSeriesQuery } from 'app/race-series/@store/race-series.query';
import { differenceInMinutes, isSameDay } from 'date-fns';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createRaceDayStart, makeRaceDayKey, RaceDay, Start } from './race-day.model';
import { RaceDayState, RaceDayStore } from './race-day.store';

@Injectable({ providedIn: 'root' })
export class RaceDayService extends CollectionService<RaceDayState> {

  sub: Subscription | undefined = undefined;

  /** Time in munites between races to group themm in a start */
  START_GROUPING_INTERVAL = 10;

  constructor(store: RaceDayStore,
    private raceSeriesQuery: RaceSeriesQuery,
    private clubQuery: ClubsQuery) {
    super(store);

    this.clubQuery.selectActiveId().pipe(
      tap(() => {
        this.store?.reset();
      }
      ));
  }

  get path() {
    const clubId = this.clubQuery.getActiveId();
    return `clubs/${clubId}/race-days`;
  }

  /** Set the active race daay to the current day
   * If the raceday does not exist then initilaise with
   * scheduled races for the current day
   */
  async setTodayActive() {
    const date = new Date();
    const key = makeRaceDayKey(date);

    const ref = this.collection.doc(key);
    const snapshot = await ref.get().toPromise();

    if (!snapshot.exists) {
      const raceDay = this._createNew(date);
      await this.add(raceDay);
    }

    if (this.sub) {
      this.sub.unsubscribe();
    }
    this.sub = this.syncActive({id: key}).subscribe();
  }

  /** Create new RaceDay populating with races for the day */
  private _createNew(day: Date): RaceDay {

    // Find races on specified day
    const races = this.raceSeriesQuery.getAllRaces().filter(race => isSameDay(new Date(race.scheduledStart), day));
    const starts: Start[] = [];

    // Allocate races to starts. Allocated to same start if scheduled data time is less then 10 minutes
    starts.push(createRaceDayStart({}));
    let previousRace: Race | undefined = undefined;
    for (const race of races) {
      if (previousRace) {
        const previousStart = new Date(previousRace.scheduledStart);
        const start = new Date(race.scheduledStart);
        if ( differenceInMinutes(start, previousStart) > this.START_GROUPING_INTERVAL+1 ) {
          starts.push(createRaceDayStart({}));
        }
      }
      starts[ starts.length-1 ].raceIds.push(race.id);
      previousRace = race;
    }
    return { id: makeRaceDayKey(day), date: day.toISOString(), starts: starts };
  }
}
