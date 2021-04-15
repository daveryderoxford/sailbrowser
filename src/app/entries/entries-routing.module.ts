import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { PendingChangesGuard } from 'app/services/pending-changes.guard';
import { SelectRacesComponent } from './select-races/select-races.component';

const routes: Routes = [
  { path: '', component: SelectRacesComponent },
  { path: 'select-races', component: SelectRacesComponent, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
