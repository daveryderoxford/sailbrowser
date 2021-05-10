import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartListComponent } from './start-list/start-list.component';

const routes: Routes = [{ path: '', component: StartListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RaceDayRoutingModule { }
