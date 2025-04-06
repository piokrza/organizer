import { environment } from './environments/environment';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { routes, AppComponent } from 'src/app';

import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

const provideFirebase = () => [
  provideAuth(() => getAuth()),
  provideFirestore(() => getFirestore()),
  provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
];
const provideIonic = () => [provideIonicAngular(), { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }];

bootstrapApplication(AppComponent, {
  providers: [...provideFirebase(), ...provideIonic(), provideRouter(routes, withPreloading(PreloadAllModules))],
});
