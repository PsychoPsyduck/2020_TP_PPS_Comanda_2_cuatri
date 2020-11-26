import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/clases/usuario';
import { VerPedidoComponent } from 'src/app/componentes/ver-pedido/ver-pedido.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-lista-pedidos-cocina',
  templateUrl: './lista-pedidos-cocina.page.html',
  styleUrls: ['./lista-pedidos-cocina.page.scss'],
})
export class ListaPedidosCocinaPage implements OnInit {

  lista = [];
  user:any = new Usuario;
  
  constructor(private dataService: DataService,
              private pedidoService: PedidoService,
              private toas: ToastrService,
              private auth: AuthService,
              private modal: ModalController,) { }

  ngOnInit() {
    this.dataService.getPedidos().subscribe(res=>{
      this.lista = res.filter(res => res.estado == 1);
    })
  }

  ionViewWillEnter() {
    this.auth.getCurrentUserMail().then(res =>{
      this.dataService.getUserByUid(res.uid).subscribe(us =>{
        this.user = us;
      })
    })
  }
  

  tomarPedidoCocina(item) {
    this.pedidoService.updateEstadoCocina(item.uid, 1).then(res =>{
      this.toas.success("Se ha entregado la comida");
      if(item.estadoBar == 1) {
        this.pedidoService.updateEstado(item.uid, 2).then(res =>{
          this.toas.success("El pedido esta listo");
          const index = this.lista.indexOf(item, 0);
          if (index > -1) {
            this.lista.splice(index, 1);
          }
        });
      }
    });
  }

  tomarPedidoBar(item) {
    this.pedidoService.updateEstadoBar(item.uid, 1).then(res =>{
      this.toas.success("Se ha entregado la bebida");
      if(item.estadoCocina == 1) {
        this.pedidoService.updateEstado(item.uid, 2).then(res =>{
          this.toas.success("El pedido esta listo");
          const index = this.lista.indexOf(item, 0);
          if (index > -1) {
            this.lista.splice(index, 1);
          }
        });
      }
    });
  }

  openModal(option: any) {
    let platos;

    if(this.user.perfil == "cocinero") {
      platos = option.platos.filter(x => x.tipo == "Comida" || x.tipo == "comida");
    } else {
      platos = option.platos.filter(x => x.tipo == "Bebida" || x.tipo == "bebida");
    }

    this.modal.create({
      component: VerPedidoComponent,
      componentProps: {
        pedido: platos
      }
    }).then((modal) => {
        modal.present();
    });
  }
}
