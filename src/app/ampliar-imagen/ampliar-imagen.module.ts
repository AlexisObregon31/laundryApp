import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmpliarImagenPageRoutingModule } from './ampliar-imagen-routing.module';

import { AmpliarImagenPage } from './ampliar-imagen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmpliarImagenPageRoutingModule
  ],
  declarations: [AmpliarImagenPage]
})
export class AmpliarImagenPageModule {}
