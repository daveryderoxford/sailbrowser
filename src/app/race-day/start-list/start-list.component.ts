import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from 'app/clubs/@store/club.model';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { Fleet } from 'app/model/fleet';
import { Race } from 'app/model/race';
import { StartService } from 'app/start/@store/start.service';
import { Observable } from 'rxjs';
import { RaceDayQuery, RaceDayWithRaces } from '../@store/race-day.query';
import { RaceDayService } from '../@store/race-day.service';

@Component({
  selector: 'app-start-list',
  templateUrl: './start-list.component.html',
  styleUrls: ['./start-list.component.css']
})
export class StartListComponent {
  raceDay$: Observable<RaceDayWithRaces[]>;
  fleets: Fleet[] = [];

  constructor(private router: Router,
    private raceDayService: RaceDayService,
    raceDayQuery: RaceDayQuery,
    private startService: StartService,
    private clubQuery: ClubsQuery) {
      this.raceDay$ = raceDayQuery.raceDayWithRaces$;
  }

  ionViewWillEnter() {
    this.raceDayService.setTodayActive();
    this.fleets = this.clubQuery.fleets;
  }

  runStart(races: Race[]) {
    if (races.length === 0) {
      return;
    }
    const club = this.clubQuery.getActive() as Club;
    const sequence = club.defaultFlagStartSequence;
    this.startService.resetSequence(races, sequence);
    this.router.navigate(['/start']);
  }
}
