import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { addIcons } from 'ionicons';
import { search, card } from 'ionicons/icons';

import {
  IonTab,
  IonIcon,
  IonTabs,
  IonLabel,
  IonTitle,
  IonHeader,
  IonTabBar,
  IonToolbar,
  IonContent,
  IonTabButton,
} from '@ionic/angular/standalone';

const imports = [IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonIcon, IonTab, IonLabel, IonTabBar, IonTabButton, RouterOutlet];

@Component({
  selector: 'org-places',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Places</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-tabs>
        <ion-tab-bar slot="button">
          <ion-tab-button tab="discover">
            <ion-label>Discover</ion-label>
            <ion-icon name="search" />
          </ion-tab-button>
        </ion-tab-bar>

        <ion-tab-bar slot="button">
          <ion-tab-button tab="offers">
            <ion-label>Offers</ion-label>
            <ion-icon name="card" />
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-content>
  `,
  imports,
})
export class PlacesComponent {
  constructor() {
    addIcons({ search, card });
  }
}
