import { Injectable } from '@angular/core';
import { Race } from 'app/model/race';
import { RaceSeriesQuery } from 'app/race-series/@store/race-series.query';
import { RaceSeriesService } from 'app/race-series/@store/race-series.service';
import { assertExists } from 'app/utilities/misc';
import { addMinutes, differenceInSeconds, endOfMinute, isEqual, subMinutes } from 'date-fns';
import { interval, Observable, Subscription } from 'rxjs';
import { createStartFlagTiming, StartFlagSequence, StartFlagTiming, StartStatus, StartStore } from './start.store';

@Injectable({ providedIn: 'root' })
export class StartService {

  private _beepTimes = [0, 1, 2, 3, 4, 5, 10, 15, 30];

  private timer: Observable<number>;
  private timerSubscription!: Subscription;

  snd = new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');

  constructor(private startStore: StartStore,
    private seriesService: RaceSeriesService,
    private seriesQuery: RaceSeriesQuery) {
    this.timer = interval(1000);   // One second timer
  }

  /** Handler for one second timer */
  private _timerUpdated(count: number) {

    this.startStore.update(s => {

      const races = [...s.races];
      const startedRaces = [...s.startedRaces];
      const flags = [...s.flagTimes];
      let status = s.state;

      const now = new Date();
      const secondstoNewFlag = differenceInSeconds(s.flagTimes[0].time, now)

      const raceStart = new Date(s.races[0].actualStart);
      const secondstoStart = differenceInSeconds(raceStart, now)

      /** Beep at set times before the start */
      if (this._beepTimes.indexOf(secondstoNewFlag) !== -1) {
        this._beep();
      }

      if (secondstoNewFlag <= 0) {
        flags.shift();
      }

      if (secondstoStart <= 0) {
        //* update persistent race status
        const series = assertExists(this.seriesQuery.getEntity(races[0].seriesId));
        this.seriesService.updateRace(series, races[0].id, { status: 'InProgress', actualStart: now.toISOString() });
        startedRaces.push(races[0]);
        races.shift();

        /** end of start sequence */
        if (races.length === 0) {
          status = StartStatus.finished;
          this.timerSubscription.unsubscribe();
        }
      }

      return { flagTimes: flags,
                races: races,
                startedRaces: startedRaces,
                status: status
              }
    });
  }

  /** completely reset the start sequence, specifiying a new set of races */
  resetSequence(races: Race[], sequence: StartFlagSequence) {
    this.startStore.reset();
    this.startStore.update({ races: races, sequence: sequence})
  }

  /** Start/stop running the start service */
  public runStartSequence(option: 'Now' | 'NextMinute' | 'ScheduledTime') {
    // Need to call beep in button click handler so Safari will play audio as
    // it only plays audio in response to user input.
    this._beep();

    this.timerSubscription = this.timer.subscribe((count) => this._timerUpdated(count));

    this.startStore.update(s => {

      let firstStartTime: Date;
      if (option === 'NextMinute') {
        firstStartTime = addMinutes(endOfMinute(new Date()), s.sequence.interval);
      } else if (option === 'ScheduledTime') {
        firstStartTime = new Date(s.races[0].scheduledStart);
      } else {
        firstStartTime = new Date();
      }

      // Set actual start time of the races
      const races = this._calculateRaceStartTimes(firstStartTime, s.races, s.sequence);

      const flags = this._calculateFlags(races, s.sequence);

      return { firstStartTime: firstStartTime, state: StartStatus.running, races: races, flagTimes: flags }
    });
  }

  private _calculateFlags(races: Race[], sequence: StartFlagSequence): StartFlagTiming[] {

    const flags: StartFlagTiming[] = [];

    for (let race of races) {
      const startTime = new Date(race.actualStart);

      const classUpTime = subMinutes(startTime, sequence.classUp);
      let flag = this._findOrCreateFlagForTime(classUpTime, flags);
      flag.classFlagUp = race;

      let prepUpTime = subMinutes(startTime, sequence.prepUp);
      flag = this._findOrCreateFlagForTime(prepUpTime, flags);
      // If prep flag is raised and lowered at a time do nothing
      if ( flag.prep === 'down') {
        flag.prep = '';
      } else {
         flag.prep = 'up';
      }

      let prepDownTime = subMinutes(startTime, sequence.prepDown);
      flag = this._findOrCreateFlagForTime(prepDownTime, flags);
      flag.prep = 'down';

      flag = this._findOrCreateFlagForTime(startTime, flags);
      flag.classFlagDown = race;

    }

  // console.log( 'Flags \n' )
  //  flags.forEach( r => console.log( r.time + ' classdown: ' + r.classFlagDown?.fleetId + '  ' +
  //                                   'classup: ' + r.classFlagUp?.fleetId +   '   ' +
  //                                   'prep: ' + r.prep + '\n'));
    return flags;
  }

  private _findOrCreateFlagForTime(time: Date, flags: StartFlagTiming[]): StartFlagTiming {
    let flag = flags.find(flag => isEqual(flag.time, time));
    if (!flag) {
      flag = createStartFlagTiming({time: time});
      flags.push(flag);
    }
    return flag;
  }

  private _calculateRaceStartTimes(firstStartTime: Date, races: Race[], seq: StartFlagSequence): Race[] {

    const updated = races.map(race => {
      const r = {...race, actualStart: firstStartTime.toISOString()} as Race;
      firstStartTime = addMinutes(firstStartTime, seq.interval);
      return r;
    });

  //  updated.forEach( r => console.log( r.fleetId + '  ' + r.actualStart + '\n'))

    return updated
  }

  public stopStartSequence() {
    this.timerSubscription.unsubscribe();
    this.startStore.update({ state: StartStatus.stopped });
  }

  /** Recall the last race start - optionally move the class to the end of the start sequence
      The timer continues running during this period */
  public generalRecall(moveToEnd: boolean) {
    this.startStore.update(s => {
      let races = [...s.races];

      // Recalculate time of the first start adding one minuite for postponement
      const recalledStartTime = new Date(s.races[0].actualStart);
      const recallDown = addMinutes(recalledStartTime, s.sequence.classUp);
      const firstStartTime = addMinutes(recalledStartTime, s.sequence.classUp + 1);

      // Reorder races if required
      if (moveToEnd) {
        races.push(races[0]);
        races.shift();
      }

      races = this._calculateRaceStartTimes(firstStartTime, races, s.sequence);

      const flags = this._calculateFlags(races, s.sequence);

      // Add recall flag
      const flag = createStartFlagTiming({ time: recallDown, recall: 'up' });

      return { races: races, flags: [flag, ...s.flagTimes] }
    });
  }

  /** Postpone start sequence for a specified number of minutes
 start sequence will be re-started once a specific time has ellapsed or endPostponement method is called */
  public postponeStart(minutes: number) {
    this.startStore.update({ state: StartStatus.postponed });
    /* TODO Update start times based on Postponement time if it is set */
  }

  /** End indefinite postponemt
     The postponement flag will be lowered in inMinutes minutes  */
  public endPostponement(inMinutes: number) {

    /** TODO Reschedule start time based on minutes to end of postponement */
  }

  private _beep() {
    this.snd.play();
  }
}
