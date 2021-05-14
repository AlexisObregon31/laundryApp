import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmpliarImagenPage } from './ampliar-imagen.page';

const routes: Routes = [
  {
    path: '',
    component: AmpliarImagenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmpliarImagenPageRoutingModule {}
