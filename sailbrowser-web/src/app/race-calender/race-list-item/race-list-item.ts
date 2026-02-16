import { Component, input, output } from '@angular/core';
import { Race } from '../@store/race';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-race-list-item',
  imports: [MatListModule, DatePipe, MatIconModule],
  templateUrl: './race-list-item.html',
  styles: ``,
})
export class RaceListItem {
  race = input.required<Race>();
  edit = output<Race>();
  delete = output<Race>();
}
