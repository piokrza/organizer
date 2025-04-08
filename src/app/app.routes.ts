import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { Routes } from '@angular/router';

import { Path } from '#core/enum';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Path.AUTH,
  },
  {
    path: Path.AUTH,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo([Path.FIN_TRACK]) },
    loadChildren: async () => (await import('#auth/index')).AuthModule,
  },
  {
    path: Path.FIN_TRACK,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo([Path.AUTH]) },
    loadChildren: async () => (await import('#fin-track/index')).FinTracktModule,
  },
  {
    path: Path.COURSE,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo([Path.AUTH]) },
    loadChildren: async () => (await import('#course/index')).CourseModule,
  },
];
