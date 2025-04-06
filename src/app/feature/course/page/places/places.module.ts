import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: async () => (await import('#course/page/places')).PlacesComponent,
    children: [
      {
        path: 'discover',
        children: [
          {
            path: '',
            loadComponent: async () => (await import('#course/page/discover')).DiscoverComponent,
          },
          {
            path: ':placeId',
            loadComponent: async () => (await import('#course/component/place-detail')).PlaceDetailComponent,
          },
        ],
      },
      {
        path: 'offers',
        children: [
          {
            path: '',
            loadComponent: async () => (await import('#course/page/offers')).OffersComponent,
          },
          {
            path: 'new',
            loadComponent: async () => (await import('#course/component/new-offer')).NewOfferComponent,
          },
          {
            path: 'edit/:placeId',
            loadComponent: async () => (await import('#course/component/edit-offer')).EditOfferComponent,
          },
          {
            path: ':placeId',
            loadComponent: async () => (await import('#course/component/offer-bookings')).OfferBookingsComponent,
          },
        ],
      },
      {
        path: '',
        redirectTo: '/course/places/tabs/discover',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/course/places/tabs/discover',
    pathMatch: 'full',
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class PlacesModule {}
