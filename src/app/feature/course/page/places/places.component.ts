import { Component } from '@angular/core';

import { IonIcon, IonTabs, IonLabel, IonTabBar, IonContent, IonTabButton } from '@ionic/angular/standalone';

const imports = [IonContent, IonTabs, IonIcon, IonLabel, IonTabBar, IonTabButton];

@Component({
  selector: 'org-places',
  template: `
    <ion-content class="ion-padding">
      <ion-tabs>
        <ion-tab-bar slot="button">
          <ion-tab-button tab="discover">
            <ion-label>Discover</ion-label>
            <ion-icon name="search" />
          </ion-tab-button>

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
export class PlacesComponent {}
