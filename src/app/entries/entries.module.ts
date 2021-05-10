import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EnterComponent } from './enter/enter.component';
import { RaceSeriesModule } from 'app/race-series/race-series.module';

@NgModule({
  declarations: [EnterComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    RaceSeriesModule
  ]
})
export class EntriesModule { }
