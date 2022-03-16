import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicioPrendaPage } from './servicio-prenda.page';

const routes: Routes = [
  {
    path: '',
    component: ServicioPrendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicioPrendaPageRoutingModule {}
