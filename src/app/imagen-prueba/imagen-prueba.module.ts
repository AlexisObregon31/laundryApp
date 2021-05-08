import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImagenPruebaPageRoutingModule } from './imagen-prueba-routing.module';

import { ImagenPruebaPage } from './imagen-prueba.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImagenPruebaPageRoutingModule
  ],
  declarations: [ImagenPruebaPage]
})
export class ImagenPruebaPageModule {}
