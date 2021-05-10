import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BoatEditComponent } from './boat-edit/boat-edit.component';
import { BoatSelectComponent } from './boat-select/boat-select.component';
import { BoatTypePipe } from './boat-type.pipe';
import { BoatsListComponent } from './boats-list/boats-list.component';
import { BoatsRoutingModule } from './boats-routing.module';

@NgModule({
  declarations: [
    BoatsListComponent,
    BoatEditComponent,
    BoatTypePipe,
    BoatSelectComponent,
  ],
  imports: [
    SharedModule,
    BoatsRoutingModule,
  ],
  exports: [
    BoatSelectComponent,
    BoatTypePipe,
  ],
})
export class BoatsModule { }


