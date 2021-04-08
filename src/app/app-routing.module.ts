import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/homescreen/home.component';

const routes: Routes = [
   { path: '', component: HomeComponent },
   { path: 'home', component: HomeComponent },
   { path: 'boats', loadChildren: () => import('./boats/boats.module').then(m => m.BoatsModule) },
   { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
   { path: 'start', loadChildren: () => import('./start/start.module').then(m => m.StartModule) },
   { path: 'results', loadChildren: () => import('./results/results.module').then(m => m.ResultsModule) },
   { path: 'finish', loadChildren: () => import('./finish/finish.module').then(m => m.FinishModule) },
   { path: 'entries', loadChildren: () => import('./entries/entries.module').then(m => m.EntriesModule) },
   { path: 'races', loadChildren: () => import('./race-series/race-series.module').then(m => m.RaceSeriesModule) },
];
@NgModule({
   imports: [
      RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
      })
   ],
   exports: [RouterModule]
})
export class AppRoutingModule { }



