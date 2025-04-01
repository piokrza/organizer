import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: async () => (await import('#fin-track/page/dashboard')).DashboardComponent,
  },
  {
    path: 'settings',
    loadComponent: async () => (await import('#fin-track/page/settings')).SettingsComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class FinTracktModule {}
