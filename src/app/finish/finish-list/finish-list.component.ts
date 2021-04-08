import { Component, OnInit } from '@angular/core';
import { createRaceCompetitor, RaceCompetitor } from 'app/model/race-competitor';


const comp = createRaceCompetitor({
  boatClass: 'Fireball',
  helm: 'Dave Ryder',
  sailnumber: 14755,
  crew: 'Michelle Ryder',
  handicap: 957,
}) as RaceCompetitor;


@Component({
  selector: 'app-finish-list',
  templateUrl: './finish-list.component.html',
  styleUrls: ['./finish-list.component.css']
})
export class FinishListComponent implements OnInit {

  competitors = Array(10).fill(comp);

  constructor() { }

  ngOnInit(): void {
  }

  lap() {
    console.log('lap');
  }

  finish() {
    console.log('finish');
  }

  top() {
    console.log('top');
  }

  approaching() {
    console.log('approaching');
  }

}
