import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { Usuario } from 'src/app/clases/usuario';
import { PedidoComponent } from 'src/app/componentes/pedido/pedido.component';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  listaPlatos;
  user:any = new Usuario;
  total = 0;
  items = []
  plato:any;
  mostrar = false;

  constructor(private dataService: DataService,
              private modal: ModalController,
              private auth: AuthService) { }

  ngOnInit() {
    this.dataService.getAll("platos").subscribe(res => {

      this.listaPlatos = res
    });

    this.auth.getCurrentUserMail().then(res =>{
      
      this.dataService.getUserByUid(res.uid).subscribe(us =>{
        this.user = us;

      })
      
    })
  }

  agregar(plato) {
    this.items.push(plato);
    this.total += plato.precio;
  }

  prueba(pla:any)
  { 
    this.plato = pla;
    this.mostrar = true;
  }

  cerrar(item:boolean)
  {
     this.mostrar = item;
  }

  openModal() {
    this.modal.create({
      component: PedidoComponent,
      componentProps: {
        pedido: this.items,
        usuario: this.user
      }
    }).then((modal) => {
      //abre el modal si hay por lo menos un item seleccionado
      if(this.items.length > 0) {
        modal.present();
      }
    });
  }
}
