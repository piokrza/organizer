import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: async () => (await import('#course/page/auth')).AuthComponent,
  },
  {
    path: 'places',
    loadChildren: async () => (await import('#course/page/places')).PlacesModule,
  },
  {
    path: 'bookings',
    loadComponent: async () => (await import('#course/page/bookings')).BookingsComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class CourseModule {}
