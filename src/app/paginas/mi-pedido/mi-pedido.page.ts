import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EncuestaComponent } from 'src/app/componentes/encuesta/encuesta.component';
import { JuegoComponent } from 'src/app/componentes/juego/juego.component';

@Component({
  selector: 'app-mi-pedido',
  templateUrl: './mi-pedido.page.html',
  styleUrls: ['./mi-pedido.page.scss'],
})
export class MiPedidoPage implements OnInit {

  pedido;

  constructor(private modal: ModalController) { }

  ngOnInit() {
  }

  openModal(modal: string) {
    switch (modal) {

      case "encuesta":
        this.modal.create({
          component: EncuestaComponent,
          componentProps: {
            // pedido: this.items
          }
        }).then((modal) => {
          //abre el modal si hay por lo menos un item seleccionado
          if(true) {
            modal.present();
          }
        });
        break;

      case "juego":
        this.modal.create({
          component: JuegoComponent,
          componentProps: {
            // pedido: this.items
          }
        }).then((modal) => {
          //abre el modal si hay por lo menos un item seleccionado
          if(true) {
            modal.present();
          }
        });
        break;

    }
    
  }
}
