import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ResultsRoutingModule } from './results-routing.module';
import { ResultsListComponent } from './results-list/results-list.component';
import { EditResultComponent } from './edit-result/edit-result.component';

@NgModule({
  declarations: [ResultsListComponent, EditResultComponent],
  imports: [
    SharedModule,
    ResultsRoutingModule
  ]
})
export class ResultsModule { }
