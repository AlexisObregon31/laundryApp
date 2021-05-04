import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioObjetoPageRoutingModule } from './servicio-objeto-routing.module';

import { ServicioObjetoPage } from './servicio-objeto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicioObjetoPageRoutingModule
  ],
  declarations: [ServicioObjetoPage]
})
export class ServicioObjetoPageModule {}
