import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LavanderiaPrendaPage } from './lavanderia-prenda.page';

const routes: Routes = [
  {
    path: '',
    component: LavanderiaPrendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LavanderiaPrendaPageRoutingModule {}
