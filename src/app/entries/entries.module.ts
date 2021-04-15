import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SelectRacesComponent } from './select-races/select-races.component';
import { SelectCompetitorComponent } from './select-competitor/select-competitor.component';


@NgModule({
  declarations: [SelectRacesComponent, SelectCompetitorComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule
  ]
})
export class EntriesModule { }
