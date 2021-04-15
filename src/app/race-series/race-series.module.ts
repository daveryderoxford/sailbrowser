import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RaceSeriesRoutingModule } from './race-series-routing.module';
import { SeriesComponent } from './series/series.component';
import { RaceEditComponent } from './race-edit/race-edit.component';
import { SeriesEditComponent } from './series-edit/series-edit.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { CopySeriesComponent } from './copy-series/copy-series.component';

@NgModule({
  declarations: [
    SeriesComponent,
    RaceEditComponent,
    SeriesEditComponent,
    SeriesListComponent,
    CopySeriesComponent
  ],
  imports: [
    SharedModule,
    RaceSeriesRoutingModule,
  ]
})
export class RaceSeriesModule { }
