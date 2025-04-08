import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { tap } from 'rxjs';

import { NavController } from '@ionic/angular';
import { IonBackButton, IonHeader, IonToolbar, IonButtons, IonButton, IonContent, IonTitle } from '@ionic/angular/standalone';

import { Place } from '#course/model';
import { PlacesService } from '#course/service';

const imports = [IonBackButton, IonButton, IonHeader, IonToolbar, IonButtons, IonContent, IonTitle, RouterLink];

@Component({
  selector: 'org-offer-bookings',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/course/places/tabs/offers" />
        </ion-buttons>

        <ion-title>{{ place()?.title }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-button class="ion-margin" color="primary" [routerLink]="['/', 'course', 'places', 'tabs', 'offers', place()?.id]">
        Edit
      </ion-button>
    </ion-content>
  `,
  imports,
})
export class OfferBookingsComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef);
  readonly #placesService = inject(PlacesService);
  readonly #navController = inject(NavController);
  readonly #activatedRoute = inject(ActivatedRoute);

  readonly place = signal<Place | null>(null);

  ngOnInit(): void {
    this.#activatedRoute.paramMap
      .pipe(
        tap((paramMap) => {
          if (!paramMap.has('placeId')) this.#navController.navigateBack('/course/palces/tabs/offers');
          this.place.set(this.#placesService.places.find(({ id }) => id === paramMap.get('placeId')) ?? null);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
