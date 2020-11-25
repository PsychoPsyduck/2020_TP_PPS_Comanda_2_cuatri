import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/clases/usuario';
import { EncuestaComponent } from 'src/app/componentes/encuesta/encuesta.component';
import { JuegoComponent } from 'src/app/componentes/juego/juego.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-mi-pedido',
  templateUrl: './mi-pedido.page.html',
  styleUrls: ['./mi-pedido.page.scss'],
})
export class MiPedidoPage implements OnInit {

  pedido: any;
  user: any = new Usuario;
  pedidos;

  constructor(private modal: ModalController,
              private auth: AuthService,
              private data: DataService,
              private pedidoService: PedidoService,
              private toas: ToastrService) { }

  ngOnInit() {
    this.auth.getCurrentUserMail().then(res =>{
      
      this.data.getUserByUid(res.uid).subscribe(us =>{
        this.user = us;

        this.pedidoService.getPedido(this.user.pedido).subscribe(res => {
          console.log(res)
          let doc = res
          this.pedido = doc;
          console.log(this.pedido)
        });
        // this.pedidoService.getPedidoUser().subscribe(resPedidos => {
        //   let respuesta:any []= resPedidos;
        //   this.pedidos = respuesta.filter(x => x.usuario.uid == res.uid && x.estado != 9);
        // })

        // this.pedidoService.getPedido(res.uid).then(res => {
        //   this.pedido = res;
        // });
      })
      
    })
  }

  openModal(modal: string) {
    switch (modal) {

      case "encuesta":
        this.modal.create({
          component: EncuestaComponent,
          componentProps: {
            pedido: this.pedido,
            usuario: this.user
          }
        }).then((modal) => {
          //abre el modal si hay por lo menos un item seleccionado
          if(true) {
            modal.present();
          }
        });
        break;

      case "juego":
        this.modal.create({
          component: JuegoComponent,
          componentProps: {
            pedido: this.pedido
          }
        }).then((modal) => {
          //abre el modal si hay por lo menos un item seleccionado
          if(true) {
            modal.present();
          }
        });
        break;

    }
    
  }

  llegoPedido(item) {
    this.pedidoService.updateEstado(item.uid, 4).then(res =>{
      this.toas.success("Ha llegado el pedido");
      // const index = this.lista.indexOf(item, 0);
      // if (index > -1) {
      //   this.lista.splice(index, 1);
      // }
    });
  }

  pedirCuenta(item) {
    this.pedidoService.updateEstado(item.uid, 5).then(res =>{
      this.toas.success("Ha pedido la cuenta");
    });
  }
}
