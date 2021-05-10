import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { PendingChangesGuard } from 'app/services/pending-changes.guard';
import { SelectRacesComponent } from '../race-series/select-races/select-races.component';
import { EnterComponent } from './enter/enter.component';

const routes: Routes = [
  { path: '', component: EnterComponent, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
