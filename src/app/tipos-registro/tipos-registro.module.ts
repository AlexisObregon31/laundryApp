import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiposRegistroPageRoutingModule } from './tipos-registro-routing.module';

import { TiposRegistroPage } from './tipos-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiposRegistroPageRoutingModule
  ],
  declarations: [TiposRegistroPage]
})
export class TiposRegistroPageModule {}
