import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PruebaImagenPageRoutingModule } from './prueba-imagen-routing.module';

import { PruebaImagenPage } from './prueba-imagen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PruebaImagenPageRoutingModule
  ],
  declarations: [PruebaImagenPage]
})
export class PruebaImagenPageModule {}
