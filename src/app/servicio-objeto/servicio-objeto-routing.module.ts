import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicioObjetoPage } from './servicio-objeto.page';

const routes: Routes = [
  {
    path: '',
    component: ServicioObjetoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicioObjetoPageRoutingModule {}
