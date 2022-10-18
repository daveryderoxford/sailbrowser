import { Component, Input } from '@angular/core';
import { Competitor } from 'app/competitor/@store/competitor.model';
import { Fleet } from 'app/model/fleet';
import { Race } from 'app/model/race';

@Component({
  selector: 'app-confirm-entry',
  templateUrl: './confirm-entry.component.html',
  styleUrls: ['./confirm-entry.component.scss']
})
export class ConfirmEntryComponent  {

  @Input() competitor!: Competitor;
  @Input() fleet!: Fleet;
  @Input() race!: Race ;

  constructor() { }

  editComp() {

  }

}
