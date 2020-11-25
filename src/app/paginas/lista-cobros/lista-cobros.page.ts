import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/servicios/data.service';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-lista-cobros',
  templateUrl: './lista-cobros.page.html',
  styleUrls: ['./lista-cobros.page.scss'],
})
export class ListaCobrosPage implements OnInit {

  lista = [];
  
  constructor(private dataService: DataService,
              private pedidoService: PedidoService,
              private toas: ToastrService) { }

  ngOnInit() {
    this.dataService.getPedidos().subscribe(res=>{
      this.lista = res.filter(res => res.estado == 5);
    })
  }

  cobrarPedido(item) {
    this.pedidoService.updateEstado(item.uid, 6).then(res =>{
      this.toas.success("Se ha cobrado el pedido con éxito");
      const index = this.lista.indexOf(item, 0);
      if (index > -1) {
        this.lista.splice(index, 1);
      }
    });
  }
}
