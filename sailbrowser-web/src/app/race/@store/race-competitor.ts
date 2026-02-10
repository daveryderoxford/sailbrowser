import { ResultCode } from './result-code';

export interface ResultData {
  elapsedTime: number; // milliseconds
  correctedTime: number; // milliseconds
  position: number;
  points: number;
  isDiscarded: boolean;
  isDiscardable: boolean;
}

export class RaceCompetitor {
  id: string;
  raceId: string;
  seriesId: string;
  helm: string;
  crew?: string;
  boatClass: string;
  sailNumber: number;
  handicap: number;

  /**
   * Finish time recorded when competitor finishes.
   * If a manual finish time set by hand is specified it is used in preference.
   * The recorded finish time is null if it has not been recorded.
   */
  recordedFinishTime?: Date;

  /**
   * Manually specified finish time.
   * Used in preference to the recorded finish time if specified.
   * The manual finish time may be set to null to disable it.
   */
  manualFinishTime?: Date;

  /**
   * Start time for the competitor - set based on the race at start and finish
   */
  startTime?: Date;

  resultCode: ResultCode;

  /**
   * Number of laps - defaults to number of lap times but may be manually set
   */
  manualLaps: number;
  lapTimes: Date[];
  result?: ResultData;

  constructor(data: Partial<RaceCompetitor>) {
    this.id = data.id || '';
    this.raceId = data.raceId || '';
    this.seriesId = data.seriesId || '';
    this.helm = data.helm || '';
    this.crew = data.crew;
    this.boatClass = data.boatClass || '';
    this.sailNumber = data.sailNumber || 0;
    this.handicap = data.handicap || 0;
    this.recordedFinishTime = data.recordedFinishTime;
    this.manualFinishTime = data.manualFinishTime;
    this.startTime = data.startTime;
    this.resultCode = data.resultCode || ResultCode.NotFinished;
    this.manualLaps = data.manualLaps || 0;
    this.lapTimes = data.lapTimes || [];
    this.result = data.result;
  }
}

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'helmcrew',
})
export class HelmCrew implements PipeTransform {
  transform(comp: RaceCompetitor | null) {
    if (!comp) return;
    return comp.crew && comp.crew.trim().length > 0 ? `${comp.helm} / ${comp.crew}` : comp.helm;
  }
} 

  /**
   * TODO functions originall part of the competitor - convert to utility functions 
   * 
  /**
   * The number of laps, manual value if set, otherwise the number of lap times recorded.
   
  get numLaps(): number {
  if (this.manualLaps !== 0) {
    return this.manualLaps;
  } else {
    // If competitor has finished then he has completed an extra lap.
    return this.finishTime === undefined ? this.lapTimes.length : this.lapTimes.length + 1;
  }
   * 
   * Gets the finish time using a manually entered time in preference to
   * a recorded one. Returns undefined if no finish time is available.
   
  get finishTime(): Date | undefined {
  return this.manualFinishTime !== undefined && this.manualFinishTime !== null
    ? this.manualFinishTime
    : this.recordedFinishTime;
}

  /**
   * Returns the total time taken (finish - start) in milliseconds.
   
  get totalTime(): number {
  if (this.finishTime && this.startTime) {
    return this.finishTime.getTime() - this.startTime.getTime();
  }
  return 0;
}

  get helmCrew(): string {
  return this.crew && this.crew.trim().length > 0 ? `${this.helm} / ${this.crew}` : this.helm;
}

  /**
   * Competitor has finished OK
   
  get isOk(): boolean {
  return this.resultCode === ResultCode.Ok;
}
  */
