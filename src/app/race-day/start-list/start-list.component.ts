import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Club } from 'app/clubs/@store/club.model';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { CompetitorService } from 'app/competitor/@store/competitor.service';
import { ResultService } from 'app/competitor/@store/result.service';
import { Fleet } from 'app/model/fleet';
import { Race } from 'app/model/race';
import { RaceSeriesService } from 'app/race-series/@store/race-series.service';
import { StartService } from 'app/start/@store/start.service';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RaceDayQuery, RaceDayWithRaces } from '../@store/race-day.query';
import { RaceDayService } from '../@store/race-day.service';

@Component({
  selector: 'app-start-list',
  templateUrl: './start-list.component.html',
  styleUrls: ['./start-list.component.css']
})
export class StartListComponent implements OnDestroy {
  raceDay$: Observable<RaceDayWithRaces[]>;
  fleets: Fleet[] = [];
  sub: Subscription;

  constructor(private router: Router,
    private raceDayService: RaceDayService,
    private competitorService: CompetitorService,
    private resultService: ResultService,
    raceDayQuery: RaceDayQuery,
    private startService: StartService,
    private clubQuery: ClubsQuery,
    private raceSeriesService: RaceSeriesService) {
      this.raceDay$ = raceDayQuery.raceDayWithRaces$;

      // Subscribe to changes in the races and update the series we are subscribed to in the database
      this.sub = this.raceDay$.pipe(
        tap( startArray => {
          let seriesIds: string[] = [];
          let raceIds: string[] = [];
          startArray.map( start => {
            seriesIds = [...seriesIds, ...start.races.map( race => race.seriesId)];
            raceIds = [...seriesIds, ...start.races.map( race => race.id)];
          });
          this.competitorService.syncSeries( seriesIds);
          this.competitorService.setActiveRaces(raceIds);
          this.resultService.syncSeries( seriesIds);
          this.resultService.setActiveRaces(raceIds);
        })
      ).subscribe();
  }

  async ionViewWillEnter() {
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

  addStart() {

  }

  addRace() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
