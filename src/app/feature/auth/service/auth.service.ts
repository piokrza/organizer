import { inject, Injectable } from '@angular/core';

import { AuthHttpService } from '#auth/api/auth.service';
import { UserCredentials } from '#auth/model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly #authHttpService = inject(AuthHttpService);

  login$(payload: UserCredentials) {
    return this.#authHttpService.login$(payload);
  }
}
