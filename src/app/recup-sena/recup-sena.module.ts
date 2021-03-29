import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecupSenaPageRoutingModule } from './recup-sena-routing.module';

import { RecupSenaPage } from './recup-sena.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecupSenaPageRoutingModule
  ],
  declarations: [RecupSenaPage]
})
export class RecupSenaPageModule {}
