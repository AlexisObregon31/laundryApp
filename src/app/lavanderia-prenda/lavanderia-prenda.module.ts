import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LavanderiaPrendaPageRoutingModule } from './lavanderia-prenda-routing.module';

import { LavanderiaPrendaPage } from './lavanderia-prenda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LavanderiaPrendaPageRoutingModule
  ],
  declarations: [LavanderiaPrendaPage]
})
export class LavanderiaPrendaPageModule {}
