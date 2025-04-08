import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  IonItem,
  IonList,
  IonTitle,
  IonInput,
  IonHeader,
  IonContent,
  IonButton,
  IonToolbar,
  IonInputPasswordToggle,
} from '@ionic/angular/standalone';

import { UserCredentials } from '#auth/model';
import { AuthService } from '#auth/service';

const imports = [
  IonItem,
  IonList,
  IonTitle,
  IonInput,
  IonButton,
  IonHeader,
  IonContent,
  IonToolbar,
  ReactiveFormsModule,
  IonInputPasswordToggle,
];

@Component({
  selector: 'org-login',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ng-container [formGroup]="form">
        <ion-list>
          <ion-item>
            <ion-input label="Username" [formControl]="form.controls.name" />
          </ion-item>

          <ion-item>
            <ion-input label="Email" [formControl]="form.controls.email" />
          </ion-item>

          <ion-item>
            <ion-input label="Password" type="password" [formControl]="form.controls.password">
              <ion-input-password-toggle slot="end" />
            </ion-input>
          </ion-item>
        </ion-list>

        <ion-button (click)="loginWithEmailAndPassword()">Login</ion-button>
      </ng-container>
    </ion-content>
  `,
  imports,
})
export class LoginComponent {
  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  readonly form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  loginWithEmailAndPassword() {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const { email, name, password } = this.form.controls;
    const payload: UserCredentials = { email: email.value, username: name.value, password: password.value };

    this.#authService.login$(payload).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
