import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditResultComponent } from './edit-result/edit-result.component';
import { ResultsListComponent } from './results-list/results-list.component';

const routes: Routes = [
  { path: '', component: ResultsListComponent },
  { path: 'list', component: ResultsListComponent },
  { path: 'edit', component: EditResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
