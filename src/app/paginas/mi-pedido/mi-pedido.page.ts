import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EncuestaComponent } from 'src/app/componentes/encuesta/encuesta.component';

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

  openModal() {
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
  }
}
