import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { search, card } from 'ionicons/icons';

import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

const imports = [IonApp, IonRouterOutlet];

@Component({
  selector: 'org-root',
  template: `
    <ion-app>
      <ion-router-outlet />
    </ion-app>
  `,
  imports,
})
export class AppComponent {
  constructor() {
    addIcons({ search, card });
  }
}
