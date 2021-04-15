import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FinishListItemComponent } from './finish-list-item/finish-list-item.component';
import { FinishListComponent } from './finish-list/finish-list.component';
import { FinishRoutingModule } from './finish-routing.module';

@NgModule({
  declarations: [FinishListComponent, FinishListItemComponent],
  imports: [
    SharedModule,
    FinishRoutingModule
  ]
})
export class FinishModule { }
