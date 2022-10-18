import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FinishListItemComponent } from './finish-list-item/finish-list-item.component';
import { FinishListComponent } from './finish-list/finish-list.component';
import { FinishRoutingModule } from './finish-routing.module';
import { FinishListItemFinishedComponent } from './finish-list-item-finished/finish-list-item-finished.component';

@NgModule({
  declarations: [FinishListComponent, FinishListItemComponent, FinishListItemFinishedComponent],
  imports: [
    SharedModule,
    FinishRoutingModule
  ]
})
export class FinishModule { }
