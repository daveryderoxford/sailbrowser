import { Routes } from '@angular/router';
import { authGuard } from 'app/auth/guards/auth-guard';
import { ManualResultsPage } from './presentation/manual-results-page/manual-results-page';

export const RESULTS_ENTRY_ROUTES: Routes = [
   { path: 'manual', component: ManualResultsPage, canActivate: [authGuard] },
];