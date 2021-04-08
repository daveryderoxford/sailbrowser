import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { environment } from 'environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoatsModule } from './boats/boats.module';
import { HomeComponent } from './home/homescreen/home.component';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { SharedModule } from './shared/shared.module';
import { anchorIonicErrorComponent, IonicControlErrorComponent } from './shared/ionic-error.component';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RaceDayRacesComponent } from './race-day/race-day-races/race-day-races.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, RaceDayRacesComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    IonicModule.forRoot(),
    BoatsModule,
    AppRoutingModule,
    SharedModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    ErrorTailorModule.forRoot({
      errors: {
        useFactory() {
          return {
            required: 'This field is required',
            email: 'Invalid email address',
            minlength: ({ requiredLength  }) => `Minimum lenght ${requiredLength} characters`,
          };
        },
        deps: []
      },
      blurPredicate: (element: Element) => {
        return element.tagName === 'ION-INPUT' || element.tagName === 'ION-SELECT';
      },
      controlErrorComponent: IonicControlErrorComponent,
      controlErrorComponentAnchorFn: anchorIonicErrorComponent
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: error => 'This field is required'
        }
      },
      controlErrorComponent: IonicControlErrorComponent,
      controlErrorComponentAnchorFn: anchorIonicErrorComponent
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
