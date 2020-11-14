import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {

  pedido = [];

  constructor(private modal: ModalController) { }

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

  closeModal() {
    this.modal.dismiss();
  }
}
