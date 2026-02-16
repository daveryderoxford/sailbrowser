import { Routes } from '@angular/router';
import {authGuard} from 'app/auth/guards/auth-guard'
import {pendingChangesGuard} from 'app/shared/services/pending-changes-guard-service.guard';
import { SeriesAdd } from './series-list/series-add';
import { SeriesEdit } from './series-list/series-edit';
import { SeriesList } from './series-list/series-list';
import { SeriesDetails } from './series.details/series-details';
import { SeriesCopy } from './series-copy';
import { RaceEdit } from './race-details/race-edit';
import { RaceAdd } from './race-details/add-race';


export const RACE_CALENDER_ROUTES: Routes = [
   { path: '', component: SeriesList },
   { path: 'series-details/:id', component: SeriesDetails },
   { path: 'add', component: SeriesAdd, canDeactivate: [pendingChangesGuard], canActivate: [authGuard] },
   { path: 'edit/:id', component: SeriesEdit, canDeactivate: [pendingChangesGuard], canActivate: [authGuard] },
   { path: 'copy/:id', component: SeriesCopy, canDeactivate: [pendingChangesGuard], canActivate: [authGuard] },
   { path: 'series-details/:seriesId/add-race', component: RaceAdd, canDeactivate: [pendingChangesGuard], canActivate: [authGuard] },
   { path: 'series-details/:seriesId/edit-race/:raceId', component: RaceEdit, canDeactivate: [pendingChangesGuard], canActivate: [authGuard] },
];