import { Component } from '@angular/core';

import { IonTitle, IonHeader, IonContent, IonToolbar } from '@ionic/angular/standalone';

import { AuthFormComponent } from '#auth/component/auth-form';

const imports = [IonTitle, IonHeader, IonContent, IonToolbar, AuthFormComponent];

@Component({
  selector: 'org-signin',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Signin</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="form-wrapper">
        <org-auth-form view="signin" />
      </div>
    </ion-content>
  `,
  imports,
})
export class SigninComponent {}
