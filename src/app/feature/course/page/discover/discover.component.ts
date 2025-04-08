import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import {
  IonCol,
  IonImg,
  IonRow,
  IonGrid,
  IonCard,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
} from '@ionic/angular/standalone';

import { Place } from '#course/model';
import { PlacesService } from '#course/service';

const imports = [
  IonImg,
  IonCol,
  IonRow,
  IonGrid,
  IonCard,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
  IonCardTitle,
  CurrencyPipe,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
];

@Component({
  selector: 'org-discover',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Discover places</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ loadedPlaces()[0].title }}</ion-card-title>
                <ion-card-subtitle> {{ loadedPlaces()[0].price | currency }} </ion-card-subtitle>
              </ion-card-header>
              <ion-img [src]="loadedPlaces()[0].imageUrl" />
              <ion-card-content>
                <p>{{ loadedPlaces()[0].description }}</p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  imports,
})
export class DiscoverComponent {
  readonly #placesService = inject(PlacesService);

  readonly loadedPlaces = signal<Place[]>(this.#placesService.places);
}
