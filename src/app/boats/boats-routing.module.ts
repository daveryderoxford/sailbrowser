import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { PendingChangesGuard } from '../services/pending-changes.guard';
import { BoatEditComponent } from './boat-edit/boat-edit.component';
import { BoatsListComponent } from './boats-list/boats-list.component';

const routes: Routes = [
  { path: '', component: BoatsListComponent },
  { path: 'edit', component: BoatEditComponent, canActivate: [AuthGuard], canDeactivate: [PendingChangesGuard] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoatsRoutingModule { }
