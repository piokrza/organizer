import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat';
import { EMPTY, forkJoin, switchMap } from 'rxjs';

import { AppConfig } from '@ngpk/auth-organizer/config/models';
import { IUser } from '@ngpk/auth-organizer/model';
import { Category } from '@ngpk/cash-flow/model';
import { Collection } from '@ngpk/core/enum';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly angularFirestore = inject(AngularFirestore);

  addUserToDatabase$(user: Partial<IUser>) {
    const usersCollectionRef: AngularFirestoreCollection<IUser> = this.angularFirestore.collection(Collection.USERS);
    const configCollectionRef: AngularFirestoreCollection<AppConfig> = this.angularFirestore.collection(Collection.CONFIG);

    return usersCollectionRef
      .doc(user.uid)
      .get()
      .pipe(
        switchMap((data) => {
          return !data.exists
            ? forkJoin([
                usersCollectionRef.doc(user.uid).set({
                  displayName: user.displayName ?? '',
                  email: user.email ?? '',
                  phoneNumber: user.phoneNumber ?? '',
                  photoURL: user.photoURL ?? '',
                  uid: user.uid ?? '',
                }),
                configCollectionRef.doc(user.uid).set(this.getInitialAppConfig(user.uid ?? '')),
              ])
            : EMPTY;
        })
      );
  }

  async updateUser$(updatedUserData: IUser): Promise<void> {
    const user: AngularFirestoreDocument<IUser> = this.angularFirestore.collection<IUser>(Collection.USERS).doc(updatedUserData.uid);
    return await user.update(updatedUserData);
  }

  getIUserModel(user: firebase.User): Partial<IUser> {
    return { displayName: user.displayName, email: user.email, phoneNumber: user.phoneNumber, photoURL: user.photoURL, uid: user.uid };
  }

  private getInitialAppConfig(uid: string): AppConfig {
    return Object.freeze({
      currency: 'PLN',
      language: 'pl',
      theme: 'dark',
      id: this.angularFirestore.createId(),
      uid,
      cashFlowCategories: [
        {
          name: 'Concerts',
          type: 'income',
          id: this.angularFirestore.createId(),
        },
        {
          name: 'Salary',
          type: 'income',
          id: this.angularFirestore.createId(),
        },
        {
          name: 'Gifts',
          type: 'income',
          id: this.angularFirestore.createId(),
        },
        {
          name: 'Rental fees',
          type: 'expense',
          id: this.angularFirestore.createId(),
        },
        {
          name: 'Entertainment',
          type: 'expense',
          id: this.angularFirestore.createId(),
        },
        {
          name: 'Other',
          type: 'expense',
          id: this.angularFirestore.createId(),
        },
      ] satisfies Array<Category>,
    });
  }
}
