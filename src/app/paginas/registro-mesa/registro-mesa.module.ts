import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroMesaPageRoutingModule } from './registro-mesa-routing.module';

import { RegistroMesaPage } from './registro-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroMesaPageRoutingModule
  ],
  declarations: [RegistroMesaPage]
})
export class RegistroMesaPageModule {}
