import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { DataService } from '../../servicios/data.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.page.html',
  styleUrls: ['./lista-pedidos.page.scss'],
})
export class ListaPedidosPage implements OnInit {

  lista = [];
  
  constructor(private dataService: DataService,
              private pedidoService: PedidoService,
              private toas: ToastrService) { }

  ngOnInit() {
    this.dataService.getPedidos().subscribe(res=>{ 
      this.lista = res.filter(res => res.estado == 0);
    })
  }

  tomarPedido(item) {
    this.pedidoService.updateEstado(item.uid, 1).then(res =>{
      this.toas.success("Se ha tomado el pedido con éxito");
      const index = this.lista.indexOf(item, 0);
      if (index > -1) {
        this.lista.splice(index, 1);
      }
    });
  }
}
