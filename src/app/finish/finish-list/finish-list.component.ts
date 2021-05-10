import { Component, OnInit } from '@angular/core';
import { createRaceResult, RaceResult } from 'app/competitor/@store/competitor.model';


const comp = createRaceResult({
  boatClass: 'Fireball',
  helm: 'Dave Ryder',
  sailNumber: 14755,
  crew: 'Michelle Ryder',
  handicap: 957,
}) as RaceResult;


@Component({
  selector: 'app-finish-list',
  templateUrl: './finish-list.component.html',
  styleUrls: ['./finish-list.component.scss']
})
export class FinishListComponent implements OnInit {

  competitors = Array(10).fill(comp);

  constructor() {

  }

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

  retired() {
    console.log('retired');
  }

  viewChanged(ev: any) {
    const option = ev.detail.value;
    console.log(option);
  }

}
