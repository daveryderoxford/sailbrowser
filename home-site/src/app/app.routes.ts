import {Routes} from '@angular/router';
import { Home } from './home/home';
import { Marketing } from './marketing/marketing';

export const routes: Routes = [
  { path: '', title: 'ScoreSmarter',component: Home },
  { path: 'marketing', title: 'ScoreSmarter features', component: Marketing },
  { path: 'clubs', title: 'ScoreSmarter Clubs', loadComponent: () => import('./clubs/clubs').then(c => c.Clubs) },
  { path: '**', redirectTo: '' }
];
