import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/servicios/data.service';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-lista-pedidos-cocina',
  templateUrl: './lista-pedidos-cocina.page.html',
  styleUrls: ['./lista-pedidos-cocina.page.scss'],
})
export class ListaPedidosCocinaPage implements OnInit {

  lista = [];
  
  constructor(private dataService: DataService,
              private pedidoService: PedidoService,
              private toas: ToastrService) { }

  ngOnInit() {
    this.dataService.getPedidos().subscribe(res=>{
      this.lista = res.filter(res => res.estado == 1);
    })
  }

  tomarPedido(item) {
    this.pedidoService.updateEstado(item.uid, 2).then(res =>{
      this.toas.success("Se ha tomado el pedido con éxito");
      const index = this.lista.indexOf(item, 0);
      if (index > -1) {
        this.lista.splice(index, 1);
      }
    });
  }
}
