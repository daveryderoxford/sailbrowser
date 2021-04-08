import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BoatEditComponent } from './boat-edit/boat-edit.component';
import { BoatsListComponent } from './boats-list/boats-list.component';
import { BoatsRoutingModule } from './boats-routing.module';
import { BoatTypePipe } from './boat-type.pipe';

@NgModule({
  declarations: [
    BoatsListComponent,
    BoatEditComponent,
    BoatTypePipe,
  ],
  imports: [
    SharedModule,
    BoatsRoutingModule,
  ],
  exports: [
    BoatsListComponent,
    BoatEditComponent,
    BoatTypePipe,
  ],
})
export class BoatsModule { }


