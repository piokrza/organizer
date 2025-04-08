import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IonTitle, IonHeader, IonContent, IonToolbar } from '@ionic/angular/standalone';

import { AuthFormComponent } from '#auth/component/auth-form';
import { UserCredentials } from '#auth/model';
import { AuthService } from '#auth/service';
import { UserStore } from '#auth/state';

const imports = [IonTitle, IonHeader, IonContent, IonToolbar, AuthFormComponent];

@Component({
  selector: 'org-login',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="form-wrapper">
        <org-auth-form (formSubmit)="loginWithEmailAndPassword($event)" />
      </div>
    </ion-content>
  `,
  styleUrl: './login.component.scss',
  imports,
})
export class LoginComponent {
  protected readonly userStore = inject(UserStore);

  readonly #destroyRef = inject(DestroyRef);
  readonly #authService = inject(AuthService);

  loginWithEmailAndPassword({ email, password }: Partial<UserCredentials>) {
    if (!email || !password) return;
    this.#authService.login$({ email, password }).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe();
  }
}
