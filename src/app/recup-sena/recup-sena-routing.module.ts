import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecupSenaPage } from './recup-sena.page';

const routes: Routes = [
  {
    path: '',
    component: RecupSenaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecupSenaPageRoutingModule {}
