import { Component, OnInit } from '@angular/core';
import { Race } from 'app/model/race';
import { RaceSeries } from 'app/race-series/@store/race-series.model';
import { RaceSeriesQuery } from 'app/race-series/@store/race-series.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-races',
  templateUrl: './select-races.component.html',
  styleUrls: ['./select-races.component.scss']
})
export class SelectRacesComponent implements OnInit {
  races$: Observable<Race[]>;

  constructor(query: RaceSeriesQuery) {
    this.races$ = query.races$;
  }

  ngOnInit(): void {
  }

}
