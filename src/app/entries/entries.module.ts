import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EnterComponent } from './enter/enter.component';
import { RaceSeriesModule } from 'app/race-series/race-series.module';
import { ConfirmEntryComponent } from './confirm-entry/confirm-entry.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';
import { BoatsModule } from 'app/boats/boats.module';

@NgModule({
  declarations: [EnterComponent, ConfirmEntryComponent, EditEntryComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    RaceSeriesModule,
    BoatsModule
  ]
})
export class EntriesModule { }
