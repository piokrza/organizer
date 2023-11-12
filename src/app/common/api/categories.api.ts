import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, take } from 'rxjs';

import { Collection } from '#common/enums/collection.enum';
import { Categories } from '#common/models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoriesApi {
  private readonly angularFirestore: AngularFirestore = inject(AngularFirestore);

  public getCategories$(): Observable<Categories> {
    return this.angularFirestore
      .collection<Categories>(Collection.CATEGORIES)
      .valueChanges()
      .pipe(
        take(1),
        map((cats: Categories[]): Categories => cats[0])
      );
  }
}