import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroMesaPageRoutingModule } from './registro-mesa-routing.module';

import { RegistroMesaPage } from './registro-mesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroMesaPageRoutingModule
  ],
  declarations: [RegistroMesaPage]
})
export class RegistroMesaPageModule {}
