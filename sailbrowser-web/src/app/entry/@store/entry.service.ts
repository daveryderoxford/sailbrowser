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
  async enterRaces(comp: EntryDetails) {
    let handicap = comp.handicap;

    // Populate handicap based on the classes handicap if not provided
    if (handicap === undefined || handicap === null) {
      const boatClass = this.clubService.club().classes.find(c => c.name === comp.boatClass);
      handicap = boatClass?.handicap ?? 0;
    }

    const promises = comp.races.map(race => {
      const competitor: Partial<RaceCompetitor> = {
        raceId: race.id,
        seriesId: race.seriesId,
        helm: comp.helm,
        crew: comp.crew,
        boatClass: comp.boatClass,
        sailNumber: comp.sailNumber,
        handicap: handicap,
        resultCode: ResultCode.NotFinished
      };

      return this.raceResultsService.addResult({
        seriesId: race.seriesId,
        raceId: race.id,
      }, competitor);
    });

    await Promise.all(promises);
  }
}