import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FleetNamePipe, FleetShortNamePipe } from './fleet-name.pipe';
import { ScoringSchemePipe } from './scoring-scheme.pipe';

@NgModule({
  declarations: [FleetNamePipe, FleetShortNamePipe, ScoringSchemePipe],
  imports: [CommonModule],
  exports: [FleetNamePipe, FleetShortNamePipe, ScoringSchemePipe],
})
export class SharedPipesModule { }
