import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { FinishListComponent } from './finish-list/finish-list.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    children: [
      { path: '', component: FinishListComponent },
      { path: 'event-admin', component: FinishListComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinishRoutingModule { }
