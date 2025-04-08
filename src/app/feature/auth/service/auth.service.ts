import { inject, Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { finalize, Observable, tap } from 'rxjs';

import { AuthHttpService } from '#auth/api';
import { AuthPayload } from '#auth/model';
import { UserStore } from '#auth/state';
import { Path } from '#core/enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #router = inject(Router);
  readonly #userStore = inject(UserStore);
  readonly #authHttpService = inject(AuthHttpService);

  login$(payload: AuthPayload): Observable<UserCredential> {
    this.#userStore.setIsProcessing(true);

    return this.#authHttpService.login$(payload).pipe(
      tap(() => {
        this.#router.navigate([Path.FIN_TRACK]);
      }),
      finalize(() => this.#userStore.setIsProcessing(false))
    );
  }

  signin$(payload: AuthPayload): Observable<void> {
    this.#userStore.setIsProcessing(true);

    return this.#authHttpService.signin$(payload).pipe(
      tap(() => {
        this.#router.navigate([Path.FIN_TRACK]);
      }),
      finalize(() => {
        this.#userStore.setIsProcessing(false);
      })
    );
  }

  logout(): Promise<void> {
    return this.#authHttpService.logout();
  }
}
