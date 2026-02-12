import { Routes } from '@angular/router';
import { authGuard } from 'app/auth/guards/auth-guard';
import { ManualResultsPage } from './manual-results-page/manual-results-page';

export const RACE_RESULTS_ROUTES: Routes = [
   { path: 'entry', component: ManualResultsPage, canActivate: [authGuard] },
];