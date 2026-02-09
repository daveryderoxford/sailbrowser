import { Injectable } from '@angular/core';
import { Race } from 'app/race-calender/@store/race';
import { RaceCompetitor } from 'app/race/@store/race-competitor';

export interface EntryDetails {
   races: Race[];
   helm: string;
   crew ?: string;
   boatClass: string;
   sailNumber: number;
   handicap?: number;
}

@Injectable({
   providedIn: 'root'
})
export class EntryService {

   /** Enter a race */
   async enterRaces(comp: EntryDetails) {
      // TO DO Create a RaceCompetitor 
      // Populate handicap based on the classes handicap
      // Save the racecompetior in the series/race/raceresults collection

   }
}