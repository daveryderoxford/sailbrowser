import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaceDayRoutingModule } from './race-day-routing.module';
import { StartListComponent } from './start-list/start-list.component';
import { SharedModule } from 'app/shared/shared.module';
import { RacesComponent } from './races/races.component';


@NgModule({
  declarations: [StartListComponent, RacesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RaceDayRoutingModule
  ]
})
export class RaceDayModule { }
