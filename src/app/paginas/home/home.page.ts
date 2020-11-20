import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router,private auth:AuthService) {}

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
      case "lista-pedidos":
          this.router.navigate(['/lista-pedidos']);
        break;
    }
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
