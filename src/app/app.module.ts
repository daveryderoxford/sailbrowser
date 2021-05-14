import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { PERSISTENCE } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { environment } from 'environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoatsModule } from './boats/boats.module';
import { HomeComponent } from './home/homescreen/home.component';
import { anchorIonicErrorComponent, IonicControlErrorComponent } from './shared/ionic-error.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    IonicModule.forRoot(),
    BoatsModule,
    AppRoutingModule,
    SharedModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    ErrorTailorModule.forRoot({
      // eslint-disable-next-line object-shorthand
      errors: {
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        useFactory() {
          return {
            required: 'This field is required',
            email: 'Invalid email address',
            minlength: ({ requiredLength  }) => `Minimum lenght ${requiredLength} characters`,
          };
        },
        deps: []
      },
      blurPredicate: (element: Element) => element.tagName === 'ION-INPUT' || element.tagName === 'ION-SELECT',
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
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: PERSISTENCE, useValue: 'local' },
],
  bootstrap: [AppComponent],
})
export class AppModule {}
