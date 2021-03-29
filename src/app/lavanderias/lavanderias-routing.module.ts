import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LavanderiasPage } from './lavanderias.page';

const routes: Routes = [
  {
    path: '',
    component: LavanderiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LavanderiasPageRoutingModule {}
