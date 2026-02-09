import { Routes } from '@angular/router';
import { ChangePassword } from './change-password/change-password';
import { authGuard } from './guards/auth-guard';
import { LoginComponent } from './login/login';
import { RecoverComponent } from './recover/recover-password';
import { Signup } from './signup/signup';

export const AUTH_ROUTES: Routes = [
  { path: "login", component: LoginComponent, title: 'Splitsbrowser Login' },
  { path: "signup", component: Signup, title: 'SplitsbrowserSignup' },
  { path: "recover", component: RecoverComponent, title: 'Splitsbrowser Recover password' },
  { path: "change-password", component: ChangePassword, canActivate: [authGuard], title: 'Splitsbrowser Change password'},
];


