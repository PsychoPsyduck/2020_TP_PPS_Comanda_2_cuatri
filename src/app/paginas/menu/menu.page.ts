import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { PedidoComponent } from 'src/app/componentes/pedido/pedido.component';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  listaPlatos;
  total = 0;
  items = []

  constructor(private dataService: DataService,
              private modal: ModalController) { }

  ngOnInit() {
    this.dataService.getAll("platos").subscribe(res => {

      this.listaPlatos = res
    });
  }

  agregar(plato) {
    this.items.push(plato);

  }

  openModal() {
    this.modal.create({
      component: PedidoComponent,
      componentProps: {
        pedido: this.items
      }
    }).then((modal) => {
      //abre el modal si hay por lo menos un item seleccionado
      if(this.items.length > 0) {
        modal.present();
      }
    });
  }
}
