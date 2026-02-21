import { Routes } from '@angular/router';
import { ResultsViewer } from './presentation/results-viewer/results-viewer';
import { SeasonList } from './presentation/season-list/season-list';

export const PUBLISHED_RESULTS_ROUTES: Routes = [

   // On Mobile: Navigates to this route to see the list full-screen
   // On Desktop: This route shows the sidebar + a "Select an item" message
   { path: 'mobile-results-list', component: SeasonList },

   { path: 'viewer/:id', component: ResultsViewer },

   { path: '', redirectTo: 'items', pathMatch: 'full' }

];
