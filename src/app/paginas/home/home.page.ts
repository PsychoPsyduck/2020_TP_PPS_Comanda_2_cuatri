import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public router: Router) {}

  ruteador(opcion) {
    switch (opcion) {
      case "registroAdm":
          this.router.navigate(['/registro-adm'])
        break;
      case "registroPlato":
          this.router.navigate(['/registro-plato'])
        break;
    }
  }

}
