import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth-guard';

export const APP_ROUTES: Routes = [
   { path: "", redirectTo: "home", pathMatch: 'full' },
   { path: "home", title: 'Home', loadComponent: () => import('./home/home-page').then(c => c.HomePage) },
   { path: "entry", title: 'Enter', loadComponent: () => import('./entry/entry-page').then(c => c.EntryPage) },
   { path: "boats", loadChildren: () => import('./boats/boats.routes').then(r => r.BOATS_ROUTES) },
   { path: "race-calender", loadChildren: () => import('./race-calender/race-calender.routes').then(r => r.RACE_CALENDER_ROUTES) },
   { path: "sys-admin", loadChildren: () => import('./sys-admin/sys-admin.routes').then(r => r.SYS_ADMIN_ROUTES) },
   { path: "auth", loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES) },
   { path: "user", loadChildren: () => import('./user/user.routes').then(r => r.USER_ROUTES) },
   { path: "about", title: 'About Splitsbrowser', loadComponent: () => import('./about/about-page').then(c => c.AboutComponent) },
];