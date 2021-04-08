import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start/start.component';



@NgModule({
  declarations: [StartComponent],
  imports: [
    SharedModule,
    StartRoutingModule
  ]
})
export class StartModule { }
