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
import { IonicContextMenuModule } from './ionic-context-menu/ionic-context-menu.module.ts';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import IonicStepperModule from './stepper/ionic-stepper.module';
import { NarrowFormComponent } from './narrow-form/narrow-form.component';
import { StandardContentComponent } from './standard-content/standard-content.component';

@NgModule({
  declarations: [
    ToolbarMenuComponent,
    IonicControlErrorComponent,
    SailNumberComponent,
    DeletebuttonComponent,
    ToolbarBackComponent,
    ToolbarEditComponent,
    ScoringSchemeEditComponent,
    NarrowFormComponent,
    StandardContentComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    IonicContextMenuModule,
    SharedPipesModule,
    IonicStepperModule,
  ],
  exports: [
    CommonModule,
    IonicModule,
    IonicContextMenuModule,
    IonicControlErrorComponent,
    ReactiveFormsModule,
    SharedPipesModule,
    IonicStepperModule,
    ToolbarMenuComponent,
    SailNumberComponent,
    DeletebuttonComponent,
    ToolbarBackComponent,
    ToolbarEditComponent,
    ScoringSchemeEditComponent,
    NarrowFormComponent
  ]
})
export class SharedModule { }
