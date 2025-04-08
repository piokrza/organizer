import { Injectable } from '@angular/core';

import { Place } from '#course/model';

@Injectable({ providedIn: 'root' })
export class PlacesService {
  places: Place[] = [
    {
      description: 'description 1',
      id: '123',
      imageUrl: 'https://picsum.photos/200/300',
      price: 214,
      title: 'title 1',
    },
    {
      description: 'description 2',
      id: '214412424112',
      imageUrl: 'https://picsum.photos/200/300',
      price: 141,
      title: 'title 2',
    },
  ];
}
