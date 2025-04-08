import { Component } from '@angular/core';

import { IonBackButton, IonHeader, IonToolbar, IonButtons, IonContent, IonTitle } from '@ionic/angular/standalone';

const imports = [IonBackButton, IonHeader, IonToolbar, IonButtons, IonContent, IonTitle];

@Component({
  selector: 'org-new-offer',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/course/places/tabs/offers" />
        </ion-buttons>

        <ion-title>New Offer</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding"> works! </ion-content>
  `,
  imports,
})
export class NewOfferComponent {}
