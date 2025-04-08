import { inject, Injectable } from '@angular/core';
import {
  Auth,
  User,
  user,
  updateProfile,
  UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

import { AuthPayload, UserCredentials } from '#auth/model';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  readonly #firebaseAuth = inject(Auth);

  get user$(): Observable<User | null> {
    return user(this.#firebaseAuth);
  }

  signinWithEmailAndPassword$(payload: UserCredentials): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.#firebaseAuth, payload.email, payload.password).then(({ user }) => {
        return updateProfile(user, { displayName: payload.username });
      })
    );
  }

  signin$(payload: AuthPayload): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.#firebaseAuth, payload.email, payload.password).then(({ user }) => {
        return updateProfile(user, { displayName: payload.username });
      })
    );
  }

  login$(payload: UserCredentials): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.#firebaseAuth, payload.email, payload.password));
  }

  async logout(): Promise<void> {
    return await signOut(this.#firebaseAuth);
  }
}
