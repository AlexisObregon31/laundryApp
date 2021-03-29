import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LavanderiasPageRoutingModule } from './lavanderias-routing.module';

import { LavanderiasPage } from './lavanderias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LavanderiasPageRoutingModule
  ],
  declarations: [LavanderiasPage]
})
export class LavanderiasPageModule {}
