import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PathFragment } from '#core/enums';
import { AccountSettingsFormComponent, PanelComponent } from '#settings/components';

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
  },
  {
    path: PathFragment.EDIT_PROFILE,
    component: AccountSettingsFormComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class SettingsRoutingModule {}