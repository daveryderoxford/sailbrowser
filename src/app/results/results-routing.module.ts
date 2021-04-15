import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsListComponent } from './results-list/results-list.component';

const routes: Routes = [
  { path: '', component: ResultsListComponent },
  { path: 'list', component: ResultsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
