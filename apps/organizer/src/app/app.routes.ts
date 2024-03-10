import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { Routes } from '@angular/router';

import { AppPaths } from '#core/enums';
import { getTitle } from '#core/utils';

export const routes: Routes = [
  {
    path: '',
    title: getTitle('home'),
    loadComponent: async () => (await import('#search/index')).SearchComponent,
  },
  {
    path: AppPaths.TASKER,
    canActivate: [AngularFireAuthGuard],
    title: getTitle('tasker'),
    data: { authGuardPipe: () => redirectUnauthorizedTo([AppPaths.AUTHENTICATION]) },
    loadChildren: async () => (await import('#tasker/index')).TaskerModule,
  },
  {
    path: AppPaths.CASH_FLOW,
    canActivate: [AngularFireAuthGuard],
    title: getTitle('cashFlow'),
    data: { authGuardPipe: () => redirectUnauthorizedTo([AppPaths.AUTHENTICATION]) },
    loadChildren: async () => (await import('#cash-flow/index')).CashFlowModule,
  },
  {
    path: AppPaths.DRIVE,
    canActivate: [AngularFireAuthGuard],
    title: getTitle('drive'),
    data: { authGuardPipe: () => redirectUnauthorizedTo([AppPaths.AUTHENTICATION]) },
    loadChildren: async () => (await import('#drive/index')).DriveModule,
  },
  {
    path: AppPaths.SETTINGS,
    canActivate: [AngularFireAuthGuard],
    title: getTitle('settings'),
    data: { authGuardPipe: () => redirectUnauthorizedTo([AppPaths.AUTHENTICATION]) },
    loadChildren: async () => (await import('#settings/index')).SettingsModule,
  },
  {
    path: AppPaths.AUTHENTICATION,
    canActivate: [AngularFireAuthGuard],
    title: getTitle('auth'),
    data: { authGuardPipe: () => redirectLoggedInTo(['']) },
    loadChildren: async () => (await import('@ngpk/auth-organizer/feature')).AuthModule,
  },
  {
    path: '**',
    loadComponent: async () => (await import('#shared/components')).PageNotFoundComponent,
    title: getTitle('pageNotFound'),
  },
];