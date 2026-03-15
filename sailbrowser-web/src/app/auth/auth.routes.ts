import { Routes } from '@angular/router';
import { ChangePassword } from './change-password/change-password';
import { authGuard } from './guards/auth-guard';
import { LoginComponent } from './login/login';
import { RecoverComponent } from './recover/recover-password';
import { Signup } from './signup/signup';

export const AUTH_ROUTES: Routes = [
  { path: "login", component: LoginComponent, title: 'ScoreSmarter Login' },
  { path: "signup", component: Signup, title: 'ScoreSmarterSignup' },
  { path: "recover", component: RecoverComponent, title: 'ScoreSmarter Recover password' },
  { path: "change-password", component: ChangePassword, canActivate: [authGuard], title: 'ScoreSmarter Change password'},
];


