import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/servicios/data.service';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-lista-pedidos-mozo',
  templateUrl: './lista-pedidos-mozo.page.html',
  styleUrls: ['./lista-pedidos-mozo.page.scss'],
})
export class ListaPedidosMozoPage implements OnInit {

  lista = [];
  
  constructor(private dataService: DataService,
              private pedidoService: PedidoService,
              private toas: ToastrService) { }

  ngOnInit() {
    this.dataService.getPedidos().subscribe(res=>{
      this.lista = res.filter(res => res.estado == 2);
    })
  }

  tomarPedido(item) {
    this.pedidoService.updateEstado(item.uid, 3).then(res =>{
      this.toas.success("Se ha tomado el pedido con éxito");
      const index = this.lista.indexOf(item, 0);
      if (index > -1) {
        this.lista.splice(index, 1);
      }
    });
  }
}
