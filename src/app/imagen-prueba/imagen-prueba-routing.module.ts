import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImagenPruebaPage } from './imagen-prueba.page';

const routes: Routes = [
  {
    path: '',
    component: ImagenPruebaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagenPruebaPageRoutingModule {}
