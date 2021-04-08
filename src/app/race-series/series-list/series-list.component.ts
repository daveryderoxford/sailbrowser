import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { RaceSeries } from '../store/race-series.model';
import { RaceSeriesQuery } from '../store/race-series.query';
import { RaceSeriesService } from '../store/race-series.service';

@UntilDestroy()
@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css']
})
export class SeriesListComponent implements OnInit {

  series$: Observable<RaceSeries[]>;

  constructor(private router: Router,
    private service: RaceSeriesService,
    private query: RaceSeriesQuery) {
    this.service.syncCollection().pipe(
      untilDestroyed(this)
    ).subscribe();
    this.series$ = query.selectAll();
  }

  ngOnInit(): void {
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
