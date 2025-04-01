import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Path } from '#core/enum';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: Path.LOGIN,
  },
  {
    path: Path.LOGIN,
    loadComponent: async () => (await import('#auth/page/login')).LoginComponent,
  },
  {
    path: Path.SIGNIN,
    loadComponent: async () => (await import('#auth/page/signin')).SigninComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class AuthModule {}
