import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DeletebuttonComponent } from './deletebutton.component';
import { IonicControlErrorComponent } from './ionic-error.component';
import { SailNumberComponent } from './sail-number/sail-number';
import { ToolbarBackComponent } from './toolbar-back.component';
import { ToolbarEditComponent } from './toolbar-edit.component';
import { ToolbarMenuComponent } from './toolbar-menu.component';
import { ScoringSchemeEditComponent } from './scoring-scheme-edit/scoring-scheme-edit.component';

@NgModule({
  declarations: [
    ToolbarMenuComponent,
    IonicControlErrorComponent,
    SailNumberComponent,
    DeletebuttonComponent,
    ToolbarBackComponent,
    ToolbarEditComponent,
    ScoringSchemeEditComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    CommonModule,
    IonicModule,
    IonicControlErrorComponent,
    ReactiveFormsModule,
    ToolbarMenuComponent,
    SailNumberComponent,
    DeletebuttonComponent,
    ToolbarBackComponent,
    ToolbarEditComponent,
    ScoringSchemeEditComponent
  ]
})
export class SharedModule { }
