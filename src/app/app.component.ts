import { Component } from '@angular/core';

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
export class AppComponent {}
