import { Component, Input, OnInit } from '@angular/core';
import { RaceResult, SeriesCompetitor } from 'app/competitor/@store/competitor.model';

@Component({
  selector: 'app-confirm-entry',
  templateUrl: './confirm-entry.component.html',
  styleUrls: ['./confirm-entry.component.scss']
})
export class ConfirmEntryComponent implements OnInit {

  @Input() competitor!: SeriesCompetitor;
  @Input() raceResult!: RaceResult;

  constructor() { }

  ngOnInit(): void {
  }

  editComp() {

  }

}
