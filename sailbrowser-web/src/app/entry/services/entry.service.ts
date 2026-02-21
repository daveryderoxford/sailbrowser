import { Injectable, inject } from '@angular/core';
import { ClubService } from 'app/club';
import { Race } from '../../race-calender/model/race';
import { RaceCompetitor } from '../../results-input/model/race-competitor';
import { RaceCompetitorStore } from '../../results-input/services/race-competitor-store';

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

  /** Enter a race 
   * throws a *** exception if the entry is a duplicate. 
   * @
  */
  async enterRaces(details: EntryDetails): Promise<void> {
    let handicap = details.handicap;

    console.log("Calling enter races");

    if (this.isDuplicateEntry(details)) {
      throw new Error("Duplicate entry");
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
        resultCode: 'NOT FINISHED'
      };

      console.log("Adding competitor");


      return this.raceResultsService.addResult({
        seriesId: race.seriesId,
        raceId: race.id,
      }, competitor);
    });

    await Promise.all(promises);
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