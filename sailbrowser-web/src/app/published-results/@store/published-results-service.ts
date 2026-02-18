import { inject, Injectable } from '@angular/core';
import { Race } from 'app/race-calender/@store/race';
import { CurrentRaces } from 'app/results-input/@store/current-races-store';
import { RaceCompetitorStore } from 'app/results-input/@store/race-competitor-store';

@Injectable({providedIn: 'root'})
export class PublishService {
   private rcs = inject(RaceCompetitorStore);
   private races = inject(CurrentRaces);




   /** Publishes the results of a race */
   publishRace(race: Race) {

      const series = this.races.selectedSeries().find(s => s.id === race.seriesId)!;


   }
}