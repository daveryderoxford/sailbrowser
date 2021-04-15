import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { Fleet } from 'app/model/fleet';
import { Observable } from 'rxjs';
import { RaceSeries } from '../@store/race-series.model';
import { RaceSeriesQuery } from '../@store/race-series.query';
import { RaceSeriesService } from '../@store/race-series.service';

@UntilDestroy()
@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.scss']
})
export class SeriesListComponent implements OnInit {

  series$: Observable<RaceSeries[]>;
  fleets: Fleet[] = [];

  constructor(private router: Router,
    private service: RaceSeriesService,
    private query: RaceSeriesQuery,
    private clubsQuery: ClubsQuery) {

    this.service.syncCollection().pipe(
      untilDestroyed(this)
    ).subscribe();
    this.series$ = query.selectAll();
  }

  ngOnInit(): void {
  }

    ionViewWillEnter() {
      this.fleets = this.clubsQuery.fleets;
    }


  add() {
    this.service.setActive(null);
    this.router.navigate(['races/series/edit']);
  }

  seriesClicked(s: RaceSeries) {
    this.service.setActive(s.id);
    this.router.navigate(['races/series/display']);
  }

  sortBy(type: string) {

  }
}
