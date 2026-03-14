import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import {routes} from './app.routes';

// Placeholder config - user will need to update this with their actual Firebase config
export const firebaseConfig = {
  apiKey: "AIzaSyDJMflCnJkd4oFIHHVBSCh2C9sD8tiwUoA",
  authDomain: "sailbrowser-efef0.firebaseapp.com",
  projectId: "sailbrowser-efef0",
  storageBucket: "sailbrowser-efef0.appspot.com",
  messagingSenderId: "500477680330",
  appId: "1:500477680330:web:8fae64d733a9772b67b233",
  measurementId: "G-KJRV036MH7"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig))
  ],
};
