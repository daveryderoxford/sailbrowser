import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { RecoverComponent } from './recover/recover.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({

  declarations: [
    LoginComponent,
    SignupComponent,
    RecoverComponent,
    ChangePasswordComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    RecoverComponent,
    ChangePasswordComponent,
  ]
})
export class AuthModule { }
