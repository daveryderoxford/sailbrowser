import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Race } from 'app/model/race';

export enum StartStatus {
  notstarted, // start sequence has not been started
  waiting,    // Waiting for the first flag
  running,    // Start sequence running
  stopped,    // Start sequence has been stopped.  It will move into runnign state when re-started
  postponed,   // Start sequence is postponed.
  finished    // Start sequence has finished
}

export interface StartFlagSequence {
  interval: number;
  classUp: number;
  prepUp: number;
  classDown: number;
  prepDown: number;
}

export interface StartFlagTiming {
  time: Date;
  classFlagUp: Race | undefined;
  classFlagDown: Race | undefined;
  prep: '' | 'up' | 'down';
  recall: '' | 'up' | 'down';
}

export interface StartState {
  state: StartStatus;
  firstStartTime: Date;
  sequence: StartFlagSequence;
  flagTimes: StartFlagTiming[];
  races: Race[];
  startedRaces: Race[];
}

export function createInitialState(): StartState {
  return {
    state: StartStatus.notstarted,
    firstStartTime: new Date(),
    sequence: { interval: 5, classUp: 5, prepUp: 4, prepDown: 1, classDown: 0 },
    flagTimes: [],
    races: [],
    startedRaces: [],
  };
}

export function createStartFlagTiming(params: Partial<StartFlagTiming>): StartFlagTiming {
  return {
    time: new Date(),
    classFlagUp: undefined,
    classFlagDown: undefined,
    prep: '',
    recall: '',
    ...params
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'start', resettable: true })
export class StartStore extends Store<StartState> {

  constructor() {
    super(createInitialState());
  }
}
