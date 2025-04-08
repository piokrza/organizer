import { Component, inject } from '@angular/core';

import { NavController } from '@ionic/angular';
import { IonButtons, IonContent, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButton } from '@ionic/angular/standalone';

const imports = [IonButtons, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonBackButton];

@Component({
  selector: 'org-place-detail',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/course/places/tabs/discover" />
        </ion-buttons>
        <ion-title>Place details</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button color="primary" class="ion-margin">Book</ion-button>
    </ion-content>
  `,
  imports,
})
export class PlaceDetailComponent {
  readonly #navController = inject(NavController);

  bookPlace(): void {
    this.#navController.navigateBack('/course/places/tabs/discover');
  }
}
