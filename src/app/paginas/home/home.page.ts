import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { FcmService } from 'src/app/servicios/fcm.service';
import { tap } from "rxjs/operators";
import { JuegoComponent } from 'src/app/componentes/juego/juego.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {



  constructor(public router: Router,
              private auth:AuthService,
              private nav:NavController,
              private fcm:FcmService,
              public toasControl:ToastController,
              private modal: ModalController) {}
  
  // ionViewDidLoad(){
  //  this.fcm.token()
  //  this.fcm.listenToNotification().pipe(
  //    tap(msg=>{
  //      const toast =  this.toasControl.create({
  //        message: msg.body,
  //        duration: 3000
  //      });
  //      toast.then(res=>{
  //        res.present();
  //      }) 
  //    })
  //  )
  // }
  ngOnInit(): void {
    
  }

 

  ruteador(opcion) {
    switch (opcion) {
      case "registroAdm":
          this.router.navigate(['/registro-adm'])
        break;
      case "registroPlato":
          this.router.navigate(['/registro-plato'])
        break;
      case "registroMesa":
          this.router.navigate(['/registro-mesa'])
        break;
      case "envioDomicilio":
          this.router.navigate(['/envio-domicilio'])
        break;
      case "pedirMesa":
          this.router.navigate(['/pedir-mesa'])
        break;
      case "reservarMesa":
        // console.log(this.auth.usuarioaux);
          this.router.navigate(['/reservar-mesa'])
        break;
      case "menu":
          this.router.navigate(['/menu'])
        break;
      case "pedido":
          this.router.navigate(['/mi-pedido'])
        break;
      case "lista-autorizar":
          this.router.navigate(['/lista-autorizar']);
        break;
      case "lista-pedidos":
          this.router.navigate(['/lista-pedidos']);
        break;
      case "lista-pedidos-cocina":
          this.router.navigate(['/lista-pedidos-cocina']);
        break;
      case "lista-pedidos-mozo":
          this.router.navigate(['/lista-pedidos-mozo']);
        break;
    }
  }

  openModal() {
    this.modal.create({
      component: JuegoComponent,
      componentProps: {
        // pedido: this.items
      }
    }).then((modal) => {
      //abre el modal si hay por lo menos un item seleccionado
      if(true) {
        modal.present();
      }
    });
  }
  
  prueba()
  { 
    console.log(this.auth.getCurrentUserId());
  
  }

  logOut()
  {
    this.auth.logOut();
    this.router.navigated['./login.page']
  }
}
