import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: async () => (await import('#course/page/main')).MainComponent,
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)] })
export class CourseModule {}
