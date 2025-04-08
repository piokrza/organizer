import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  IonCol,
  IonImg,
  IonRow,
  IonItem,
  IonGrid,
  IonCard,
  IonList,
  IonTitle,
  IonLabel,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  IonCardTitle,
  IonThumbnail,
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
  IonItem,
  IonCard,
  IonList,
  IonLabel,
  IonTitle,
  IonButton,
  IonHeader,
  IonToolbar,
  IonContent,
  RouterLink,
  IonCardTitle,
  IonThumbnail,
  CurrencyPipe,
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
];

@Component({
  selector: 'org-discover',
  templateUrl: './discover.component.html',
  imports,
})
export class DiscoverComponent {
  readonly #placesService = inject(PlacesService);

  readonly loadedPlaces = signal<Place[]>(this.#placesService.places);
}
