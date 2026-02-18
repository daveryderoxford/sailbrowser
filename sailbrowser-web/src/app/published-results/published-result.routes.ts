import { Routes } from '@angular/router';
import { authGuard } from 'app/auth/guards/auth-guard';
import { ResultsViewer } from './results-viewer.ts/results-viewer';

export const PUBLISHED_RESULTS_ROUTES: Routes = [
   { path: 'viewer', component: ResultsViewer, canActivate: [authGuard] },
];