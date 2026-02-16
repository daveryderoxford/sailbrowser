import { Component, input, output } from '@angular/core';
import { Race } from '../@store/race';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-race-list-item',
  imports: [MatListModule, DatePipe, MatIconModule, MatButtonModule],
  templateUrl: './race-list-item.html',
  styles: `
  .gap {
    margin-right: 15px;
  }
  
  `,
})
export class RaceListItem {
  race = input.required<Race>();
  edit = output<Race>();
  delete = output<Race>();
}
