import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RaceSeriesRoutingModule } from './race-series-routing.module';
import { SeriesComponent } from './series/series.component';
import { IonicContextMenuModule } from 'ionic-context-menu';
import { RaceEditComponent } from './race-edit/race-edit.component';
import { SeriesEditComponent } from './series-edit/series-edit.component';
import { SeriesListComponent } from './series-list/series-list.component';

@NgModule({
  declarations: [
    SeriesComponent,
    RaceEditComponent,
    SeriesEditComponent,
    SeriesListComponent
  ],
  imports: [
    SharedModule,
    RaceSeriesRoutingModule,
    IonicContextMenuModule
  ]
})
export class RaceSeriesModule { }
