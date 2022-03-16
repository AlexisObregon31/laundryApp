import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioPrendaPageRoutingModule } from './servicio-prenda-routing.module';

import { ServicioPrendaPage } from './servicio-prenda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicioPrendaPageRoutingModule
  ],
  declarations: [ServicioPrendaPage]
})
export class ServicioPrendaPageModule {}
