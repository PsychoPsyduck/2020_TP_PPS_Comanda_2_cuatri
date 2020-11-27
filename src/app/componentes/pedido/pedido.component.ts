import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/servicios/data.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {

  pedido = [];
  usuario:any = Usuario;

  constructor(private modal: ModalController,
              private dataService: DataService,
              private userService: UsuarioService) { }

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
      estado: 0,
      usuario: this.usuario,
      estadoBar: 0,
      estadoCocina: 0,
      estadoEncuesta: 0
    }

    let sinCocina = pedido.platos.filter(x => x.tipo == "Comida" || x.tipo == "comida")
    let sinBar = pedido.platos.filter(x => x.tipo == "Bebida" || x.tipo == "bebida")

    if(sinCocina.length == 0) {
      pedido.estadoCocina = 1;
    } else if (sinBar.length == 0) {
      pedido.estadoBar = 1;
    }

    this.dataService.crearConUID("pedidos", pedido, this.usuario.uid).then(res => {
      
      this.closeModal();

    });
  }

  closeModal() {
    this.modal.dismiss();
  }
}
