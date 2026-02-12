import { Injectable, inject } from '@angular/core';
import { ClubService } from 'app/club/@store/club.service';
import { Race } from 'app/race-calender/@store/race';
import { RaceCompetitor } from 'app/race/@store/race-competitor';
import { RaceCompetitorStore } from 'app/race/@store/race-competitor-store';
import { ResultCode } from 'app/race/@store/result-code';

export interface EntryDetails {
  races: Race[];
  helm: string;
  crew?: string;
  boatClass: string;
  sailNumber: number;
  handicap?: number;
}

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  private clubService = inject(ClubService);
  private raceResultsService = inject(RaceCompetitorStore);

  /** Enter a race */
  async enterRaces(details: EntryDetails): Promise<boolean> {
    let handicap = details.handicap;

    if (this.isDuplicateEntry(details)) {
      return false;
    }

    // Populate handicap based on the classes handicap if not provided
    if (handicap === undefined || handicap === null) {
      const boatClass = this.clubService.club().classes.find(c => c.name === details.boatClass);
      handicap = boatClass?.handicap ?? 0;
    }

    const promises = details.races.map(race => {
      const competitor: Partial<RaceCompetitor> = {
        raceId: race.id,
        seriesId: race.seriesId,
        helm: details.helm,
        crew: details.crew,
        boatClass: details.boatClass,
        sailNumber: details.sailNumber,
        handicap: handicap,
        resultCode: ResultCode.NotFinished
      };

      return this.raceResultsService.addResult({
        seriesId: race.seriesId,
        raceId: race.id,
      }, competitor);
    });

    await Promise.all(promises);

    return true;
  }

  /** 
   * Check if a boat (class+sailnumber) is already entered
   * in any of the races being entered.
   * Returns true if a duplicate is found.
 */
  isDuplicateEntry(details: EntryDetails): boolean {
    for (const race of details.races) {
      const dup = this.raceResultsService.selectedCompetitors().find(comp =>
        comp.boatClass === details.boatClass &&
        comp.raceId === race.id &&
        comp.sailNumber == details.sailNumber);
      if (dup) {
        return true;
      }
    }

    return false;
  }

}