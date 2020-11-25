import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { ImagenesComponent  } from "../../componentes/imagenes/imagenes.component";
import { ConsultarMozoComponent  } from "../../componentes/consultar-mozo/consultar-mozo.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage,ImagenesComponent,ConsultarMozoComponent]
})
export class MenuPageModule {}
