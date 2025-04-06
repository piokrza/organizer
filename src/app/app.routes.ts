import { Routes } from '@angular/router';

import { Path } from '#core/enum';

export const routes: Routes = [
  {
    path: Path.AUTH,
    loadChildren: async () => (await import('#auth/index')).AuthModule,
  },
  {
    path: Path.FIN_TRACK,
    loadChildren: async () => (await import('#fin-track/index')).FinTracktModule,
  },
  {
    path: Path.COURSE,
    loadChildren: async () => (await import('#course/index')).CourseModule,
  },
];
