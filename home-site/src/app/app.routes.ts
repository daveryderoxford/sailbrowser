import {Routes} from '@angular/router';
import { Home } from './home';
import { Marketing } from './marketing';
import { Clubs } from './clubs';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'marketing', component: Marketing },
  { path: 'clubs', component: Clubs },
  { path: '**', redirectTo: '' }
];
