import { Component, OnInit } from '@angular/core';
import { RaceSeriesService } from 'app/race-series/store/race-series.service';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { RaceDay } from '../store/race-day.model';
import { RaceDayQuery } from '../store/race-day.query';
import { RaceDayService } from '../store/race-day.service';

@Component({
  selector: 'app-race-day-races',
  templateUrl: './race-day-races.component.html',
  styleUrls: ['./race-day-races.component.css']
})
export class RaceDayRacesComponent implements OnInit {

  raceDay$: Observable<RaceDay|undefined>;

  constructor(private service: RaceDayService, query: RaceDayQuery, private raceSeriesService: RaceSeriesService) {
    this.raceDay$ = query.raceDay$;
  }

  ngOnInit(): void {
  }

  ionCanEnterView() {
     this.raceDay$.pipe(
       filter( day => day === null ),
       tap( () => {

       })
     );
  }
}

function Obserervable(arg0: number) {
  throw new Error('Function not implemented.');
}

