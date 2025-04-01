import { Component, computed, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { UserCredentials, UserCredentialsForm } from '#auth/model';
import { Path } from '#core/enum';

const imports = [ReactiveFormsModule, RouterLink];

@Component({
  selector: 'org-auth-form',
  template: `
    <h1 class="text-center mb-6 text-3xl">{{ view() === 'login' ? 'Login' : 'Signin' }}</h1>

    <form class="grid gap-3 mb-5" [formGroup]="form" (ngSubmit)="submit()" (keyup.enter)="submit()">
      <!-- @let ctrls = form.controls; -->

      <!-- <input pInputText placeholder="Email" type="text" [formControl]="ctrls.email" /> -->
      @if (this.view() === 'signin') {
        <!-- <input pInputText placeholder="Username" type="text" [formControl]="ctrls.username" /> -->
      }
      <!-- <p-password styleClass="w-full" placeholder="Password" [feedback]="false" [formControl]="ctrls.password" /> -->
    </form>

    <!-- <button
      type="submit"
      styleClass="w-full"
      [disabled]="isProcessing()"
      [label]="view() === 'login' ? 'Login' : 'Signin'"
      (onClick)="submit()" /> -->

    <p class="mt-7 text-center">
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

  readonly view = input<'login' | 'signin'>('login');
  readonly formSubmit = output<Partial<UserCredentials>>();

  readonly form: UserCredentialsForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });
  readonly redirectPath = computed(() => ['../', this.view() === 'login' ? Path.SIGNIN : Path.LOGIN]);

  readonly Path = Path;

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
