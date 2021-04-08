import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ResultsRoutingModule } from './results-routing.module';
import { ResultsListComponent } from './results-list/results-list.component';

@NgModule({
  declarations: [ResultsListComponent],
  imports: [
    SharedModule,
    ResultsRoutingModule
  ]
})
export class ResultsModule { }
