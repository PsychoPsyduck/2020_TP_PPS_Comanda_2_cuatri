import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {

  pedido = [];

  constructor(private modal: ModalController,
              private dataService: DataService) { }

  ngOnInit() {}

  sacar(plato) {
    let index;

    // this.pedido.forEach(comida => {
      // if(comida == plato) {
      index = this.pedido.indexOf(plato);
      this.pedido.splice(index, 1);
      if(this.pedido.length == 0) {
        this.closeModal();
      }
      // }
    // });
  }

  pedir() {
    let importe = 0;

    this.pedido.forEach(element => {
      importe += element.precio;
    });

    let pedido = {
      platos: this.pedido,
      mesa: 1,
      total: importe,
      descuento: 0,
      estado: 0
    }

    this.dataService.crearConUID("pedidos", pedido).then(res => {
      this.closeModal();
    });
  }

  closeModal() {
    this.modal.dismiss();
  }
}
