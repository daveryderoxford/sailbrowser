import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { PendingChangesGuard } from 'app/services/pending-changes.guard';
import { RaceEditComponent } from './race-edit/race-edit.component';
import { SeriesEditComponent } from './series-edit/series-edit.component';
import { SeriesListComponent } from './series-list/series-list.component';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
  { path: '', component: SeriesListComponent },
  { path: 'series/list', component: SeriesListComponent },
  { path: 'series/display', component: SeriesComponent },
  { path: 'series/edit', component: SeriesEditComponent,  canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] },
  { path: 'race/edit', component: RaceEditComponent, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaceSeriesRoutingModule { }
