import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start/start.component';
import { StartgridComponent } from './startgrid/startgrid.component';
import { StartGridCellComponent } from './startgrid/start-grid-cell.component';
import { StartGridCellFleetComponent } from './startgrid/start-grid-cell-fleet.component';

@NgModule({
  declarations: [StartComponent, StartgridComponent, StartGridCellComponent, StartGridCellFleetComponent],
  imports: [
    SharedModule,
    StartRoutingModule
  ]
})
export class StartModule { }
