import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ToastController } from '@ionic/angular';

import { ScanerService } from 'src/app/servicios/scaner.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/servicios/data.service';
import { Usuario } from 'src/app/clases/usuario';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

 user:any = new Usuario;

  constructor(public router: Router,private auth:AuthService,public toasControl:ToastController, private barcodeScanner:ScanerService, private toast:ToastrService, private data:DataService) {}

  ngOnInit(): void {

    this.auth.getCurrentUserMail().then(res =>{
      
      this.data.getUserByUid(res.uid).subscribe(us =>{
        this.user = us;

      })
      
    })

  }

  // ionViewWillEnter()
  // {
  //   this.auth.getCurrentUserMail().then(res =>{
      
  //     this.data.getUserByUid(res.uid).subscribe(us =>{
  //       this.user = us;

  //     })
      
  //   })
  // }

 

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
          this.router.navigate(['/reservar-mesa'])
        break;
      case "menu":
          this.router.navigate(['/menu'])
        break;
      case "lista-autorizar":
          this.router.navigate(['/lista-autorizar']);
        break;
      case "lista-pendientes":
         this.router.navigate(['/lista-pendientes']);
        break;

    }
  }
  
  prueba()
  { 
    console.log(this.auth.getCurrentUserId());
    this.auth.registrar("ciOp3MGpT6-wcBBIyYa29v:APA91bE32-AmKVkpqTWDj3Mf3-55CnxSSYdVc0_dmgi7eRbXE7uYcmP2rQNg0Z9msTU31YES5MMxhqc-c53HcFOviRzQk5bODdX3BnfRk3YVFf7oYCCJ8tGfGmx1GqWjyb1IgAtmSibJ","Nuevo Cliente", this.user.mail + "Solicita una mesa","https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2019/06/25/15614775255199.jpg").toPromise().then(res =>{
      console.info(res);
    })
  
  }
  logOut()
  {
    this.auth.logOut();
    this.router.navigated['./login.page']
  }

  ingresar()
  {
    this.barcodeScanner.scan().then(
      barcodeData => {
        const barcodeText = barcodeData.text;

        if (barcodeText === 'laComanda') {
          this.auth.updateEstadoUsuario(this.user.uid,2).then(res =>{

            this.toast.success("Solicitud de Mesa registrada con éxito");
            this.auth.registrar("ciOp3MGpT6-wcBBIyYa29v:APA91bE32-AmKVkpqTWDj3Mf3-55CnxSSYdVc0_dmgi7eRbXE7uYcmP2rQNg0Z9msTU31YES5MMxhqc-c53HcFOviRzQk5bODdX3BnfRk3YVFf7oYCCJ8tGfGmx1GqWjyb1IgAtmSibJ","Nuevo Cliente", this.user.mail + "Solicita una mesa","https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2019/06/25/15614775255199.jpg").toPromise().then(res =>{
              console.info(res);
            })
          })
        } else {
          this.toast.error('Error al ingresar al local.');
  
        }
      },
      error => {
        // Hardcodeo
        // this.infoReserva();
        this.toast.error(error,'Se produjo un error');

        console.log('Hubo un error', error);
      }
    );
  }

  sentarse()
  { 
    console.log(this.user.mesa.codigo);
    this.barcodeScanner.scan().then(
      barcodeData => {
        const barcodeText = barcodeData.text;
         
        if (barcodeText === this.user.mesa.codigo) {

          this.router.navigate(['/menu']);
            
          
        } else {
          this.toast.error('Qr de mesa inválido.');
  
        }
      },
      error => {
        // Hardcodeo
        // this.infoReserva();
        this.toast.error(error,'Se produjo un error');

        console.log('Hubo un error', error);
      }
    );
    
  }
}
