import { Routes } from '@angular/router';
import {authGuard} from 'app/auth/guards/auth-guard'
import {pendingChangesGuard} from 'app/shared/services/pending-changes-guard-service.guard'; 
import { BoatAdd } from './presentation/boat-add';
import { BoatEdit } from './presentation/boat-edit';
import { BoatsPage } from './presentation/boat-page/boat-page';

export const BOATS_ROUTES: Routes = [
   { path: '', component: BoatsPage },
   { path: 'add', component: BoatAdd, canDeactivate: [pendingChangesGuard], canActivate: [authGuard] },
   { path: 'edit/:id', component: BoatEdit, canDeactivate: [pendingChangesGuard], canActivate: [authGuard] },
];