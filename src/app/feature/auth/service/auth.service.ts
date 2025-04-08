import { inject, Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import { AuthHttpService } from '#auth/api';
import { UserCredentials } from '#auth/model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #authHttpService = inject(AuthHttpService);

  login$(payload: UserCredentials): Observable<UserCredential> {
    return this.#authHttpService.login$(payload);
  }
}
