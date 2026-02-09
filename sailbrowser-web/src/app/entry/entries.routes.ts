import { Routes } from '@angular/router';
import { authGuard } from 'app/auth/guards/auth-guard';
import { pendingChangesGuard } from 'app/shared/services/pending-changes-guard-service.guard';
import { EntriesListPage } from './entries-list.page';
import { EntryPage } from './entry-page';

export const ENTERIES_ROUTES: Routes = [
   { path: '', component: EntriesListPage },
   { path: 'entries', component: EntriesListPage },
   { path: 'enter', component: EntryPage, canDeactivate: [pendingChangesGuard], canActivate: [authGuard] },
];