import { Routes } from '@angular/router';
import { getApp } from '@angular/fire/app';
import { SysAdminSwitchboard } from './sys-admin-switchboard';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { UserListComponent } from './user-list/user-list.component';
import { SystemDataComponent as FirestoreImportExport } from './data-import-export';

export const SYS_ADMIN_ROUTES: Routes = [
   { path: '', redirectTo: 'switchboard', pathMatch: 'full' },
   {
      path: 'switchboard',
      component: SysAdminSwitchboard,
      title: 'System Administration',
      providers: [
         provideFunctions(() => getFunctions(getApp(), 'europe-west2')),
      ],
   }, 
   {
      path: 'users',
      component: UserListComponent,
      title: 'User Administration'
   },
   {
      path: 'data',
      component: FirestoreImportExport,
      title: 'System Data Utility'
   },
];
