import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/auth/auth.guard';
import { RaceDayGuard } from 'app/race-day/race-day.guard';
import { StartComponent } from './start/start.component';

const routes: Routes = [
{  path: '', canActivate: [AuthGuard, RaceDayGuard],
  children: [
    { path: '', component: StartComponent },
    { path: 'event-admin', component: StartComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
