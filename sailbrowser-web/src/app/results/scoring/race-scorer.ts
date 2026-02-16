import { Injectable } from '@angular/core';
import { HandicapScheme } from 'app/race/@store/handicap-scheme';
import { RaceCompetitor } from 'app/race/@store/race-competitor';
import { ResultCode } from 'app/race/@store/result-code';
import { Race } from 'app/race-calender/@store/race';
import { differenceInSeconds } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class RaceScorer {
  /**
   * Calculates positions for a list of race competitors.
   * Returns a list of race competitors with updated results.
   * Support multiple lap races and 
   */
  calculateRaceResults(
    competitors: RaceCompetitor[],
    scheme: HandicapScheme,
    race: Race,
    shortSeries: boolean = false
  ): RaceCompetitor[] {

    // 1. Calculate times
    const results = competitors.map((comp) => {
      const times = this.calculateResultTimes({
        comp,
        scheme,
        isAverageLap: race.isAverageLap,
        startTime: comp.startTime!,
      });

      // Create a shallow copy with new result data
      const updatedComp = new RaceCompetitor({ ...comp });
      updatedComp.result = {
        elapsedTime: times.elapsed,
        correctedTime: times.corrected,
        position: 0,
        points: 0,
        isDiscarded: false,
        isDiscardable: true,
      };

      return updatedComp;
    });

    // 2. Sort by corrected time (taking into account result code)
    results.sort((a, b) => this.sortByCorrectedTime(a, b));

    // 3. Assign points for finishers
    this.assignPointsForFinishers(results);

    // 4. Assign points for non-finishers
    this.assignPointsForNonFinishers(results, shortSeries);

    // 5. Sort by points
    results.sort((a, b) => this.sortByPoints(a, b));

    // 6. Apply scoring penalties
    this.applyScoringPenalties(results, shortSeries);

    // Re-sort if penalties changed order
    results.sort((a, b) => this.sortByPoints(a, b));

    return results;
  }

  calculateResultTimes({
    comp,
    scheme,
    isAverageLap,
    startTime,
  }: {
    comp: RaceCompetitor;
    scheme: HandicapScheme;
    isAverageLap: boolean;
    startTime: Date;
  }): { corrected: number; elapsed: number; error: string } {
    let corrected = 0.0;
    let elapsed = 0.0;

    const finishTime = this.getFinishTime(comp);
    const compStartTime = comp.startTime || startTime;

    if (finishTime && compStartTime) {
      
      const diff = differenceInSeconds(finishTime.getTime(), compStartTime.getTime());

      if (diff < 0) {
        return { corrected: 0, elapsed: 0, error: 'Start time before finish time' };
      }

      const numLaps = this.getNumLaps(comp);
      if (isAverageLap && numLaps === 0) {
        return { corrected: 0, elapsed: 0, error: 'Number of laps 0 for average lap race' };
      }

      elapsed = isAverageLap ? (diff / numLaps) : diff;

      switch (scheme) {
        case 'PY':
          corrected = (elapsed * 1000.0) / comp.handicap;
          break;
        case 'Level Rating':
          corrected = elapsed;
          break;
      }
    } else {
      return { corrected: 0, elapsed: 0, error: '' };
    }

    return {
      corrected: Math.round(corrected),
      elapsed: Math.round(elapsed),
      error: '',
    };
  }

  startersInRace(results: RaceCompetitor[]): number {
    return results.reduce((count, comp) => {
      return this.isStartAreaComp(comp.resultCode) ? count + 1 : count;
    }, 0);
  }

  finishersInRace(results: RaceCompetitor[]): number {
    return results.reduce((count, comp) => {
      return this.isFinishedComp(comp.resultCode) ? count + 1 : count;
    }, 0);
  }

  sortByCorrectedTime(a: RaceCompetitor, b: RaceCompetitor): number {
    const aOk = this.isOk(a);
    const bOk = this.isOk(b);

    if (aOk && bOk) {
      return (a.result?.correctedTime || 0) - (b.result?.correctedTime || 0);
    } else if (aOk && !bOk) {
      return -1;
    } else if (!aOk && bOk) {
      return 1;
    } else {
      return 0;
    }
  }

  assignPointsForFinishers(results: RaceCompetitor[]) {
    const finishers = results.filter((res) => this.isFinishedComp(res.resultCode));
    const resultsByTime = new Map<number, RaceCompetitor[]>();

    finishers.forEach((res) => {
      const time = res.result?.correctedTime || 0;
      if (!resultsByTime.has(time)) resultsByTime.set(time, []);
      resultsByTime.get(time)!.push(res);
    });

    const times = Array.from(resultsByTime.keys()).sort((a, b) => a - b);
    let pos = 1.0;

    for (const time of times) {
      const resultsAtTime = resultsByTime.get(time)!;
      if (resultsAtTime.length === 1) {
        const res = resultsAtTime[0];
        if (res.result) {
          res.result.points = pos;
          res.result.position = pos;
        }
      } else {
        const avgPoints = pos - 1 + (resultsAtTime.length + 1) / 2.0;
        for (const res of resultsAtTime) {
          if (res.result) {
            res.result.points = avgPoints;
            res.result.position = pos;
          }
        }
      }
      pos += resultsAtTime.length;
    }
  }

  assignPointsForNonFinishers(results: RaceCompetitor[], shortSeries: boolean) {
    let starters = -1;

    for (const res of results) {
      if (this.isFinishedComp(res.resultCode)) continue;

      if (this.isStartAreaComp(res.resultCode)) {
        if (starters === -1) starters = this.startersInRace(results);
        if (res.result) {
          res.result.points = starters + 1.0;
          res.result.position = starters + 1;
        }
      } else {
        const totalEntries = results.length;
        if (res.result) {
          res.result.points = totalEntries + 1.0;
          res.result.position = totalEntries + 1;
        }
      }
    }
  }

  applyScoringPenalties(results: RaceCompetitor[], shortSeries: boolean) {
    for (const res of results) {
      if (res.resultCode === ResultCode.Scp && res.result) {
        res.result.points = Math.min(res.result.points * 1.2, 99999);
      }
    }
  }

  sortByPoints(a: RaceCompetitor, b: RaceCompetitor): number {
    return (a.result?.points || 9999) - (b.result?.points || 9999);
  }

  private getFinishTime(comp: RaceCompetitor): Date | undefined {
    return comp.manualFinishTime || comp.recordedFinishTime;
  }

  private getNumLaps(comp: RaceCompetitor): number {
    if (comp.manualLaps && comp.manualLaps > 0) return comp.manualLaps;
    const finishTime = this.getFinishTime(comp);
    return finishTime ? (comp.lapTimes?.length || 0) + 1 : (comp.lapTimes?.length || 0);
  }

  private isOk(comp: RaceCompetitor): boolean {
    return comp.resultCode === ResultCode.Ok;
  }

  private isFinishedComp(code: ResultCode): boolean {
    return [
      ResultCode.Ok,
      ResultCode.Scp,
      ResultCode.Zfp,
      ResultCode.Xpa,
      ResultCode.Rdg,
      ResultCode.Rdga,
      ResultCode.Rdgb,
      ResultCode.Rdgc,
      ResultCode.Dpi,
    ].includes(code);
  }

  private isStartAreaComp(code: ResultCode): boolean {
    return [
      ResultCode.Ok,
      ResultCode.Ood,
      ResultCode.Dnf,
      ResultCode.Ret,
      ResultCode.Dns,
      ResultCode.Ocs,
      ResultCode.Zfp,
      ResultCode.Ufd,
      ResultCode.Bfd,
      ResultCode.Dgm,
      ResultCode.Dsq,
      ResultCode.Xpa,
      ResultCode.Scp,
      ResultCode.Rdg,
      ResultCode.Rdga,
      ResultCode.Rdgb,
      ResultCode.Rdgc,
      ResultCode.Dpi,
    ].includes(code);
  }
}