import { Component, OnInit } from '@angular/core';
import { Race } from 'app/model/race';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit {

  races: Race[] =  [];

  constructor() { }

  ngOnInit(): void {
  }

}
