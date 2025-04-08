import { Component, computed, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { IonItem, IonList, IonInput, IonButton, IonInputPasswordToggle } from '@ionic/angular/standalone';

import { UserCredentials, UserCredentialsForm } from '#auth/model';
import { UserStore } from '#auth/state';
import { Path } from '#core/enum';

const imports = [ReactiveFormsModule, RouterLink, IonItem, IonList, IonInput, IonButton, IonInputPasswordToggle];

@Component({
  selector: 'org-auth-form',
  template: `
    <form [formGroup]="form" (keyup.enter)="submit()">
      <ion-list>
        @if (view() === 'signin') {
          <ion-item>
            <ion-input label="Username" [formControl]="form.controls.username" />
          </ion-item>
        }

        <ion-item>
          <ion-input label="Email" [formControl]="form.controls.email" />
        </ion-item>

        <ion-item>
          <ion-input label="Password" type="password" [formControl]="form.controls.password">
            <ion-input-password-toggle slot="end" />
          </ion-input>
        </ion-item>
      </ion-list>
    </form>
    <ion-button [disabled]="userStore.isProcessing()" (click)="submit()">Login</ion-button>

    <p class="mt-7 ion-text-center">
      {{ view() === 'login' ? "Don't have account?" : 'Have an account?' }}
      <a class="text-sky-500" [routerLink]="redirectPath()">
        {{ view() === 'login' ? 'Signin' : 'Login' }}
      </a>
    </p>
  `,
  imports,
})
export class AuthFormComponent {
  constructor() {
    effect(() => {
      if (this.view() === 'signin') {
        this.form.controls.username.addValidators([Validators.required]);
      } else {
        this.form.controls.username.removeValidators([Validators.required]);
      }
    });
  }

  protected readonly userStore = inject(UserStore);

  readonly view = input<'login' | 'signin'>('login');
  readonly formSubmit = output<Partial<UserCredentials>>();

  readonly form: UserCredentialsForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  readonly redirectPath = computed(() => ['../', this.view() === 'login' ? Path.SIGNIN : Path.LOGIN]);

  submit(): void {
    if (this.form.invalid) {
      this.form.markAsDirty();
      return;
    }

    const { email, password, username } = this.form.controls;
    const basePayload = { email: email.value, password: password.value };

    this.formSubmit.emit(this.view() === 'login' ? basePayload : { ...basePayload, username: username.value });
  }
}
