import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-lista-autorizar',
  templateUrl: './lista-autorizar.page.html',
  styleUrls: ['./lista-autorizar.page.scss'],
})
export class ListaAutorizarPage implements OnInit {

  lista = [];
  
  constructor(private data:DataService,private auth:AuthService,private toas:ToastrService) { }

  ngOnInit() {
    
    this.data.getUsuarios().subscribe(res=>{
      console.info(res);
      this.lista = res.filter(res => res.estado == 0 && res.perfil == "Cliente");
      console.info(this.lista);
    })

  }

  autorizar(user:any)
  {
    this.auth.updateEstadoUsuario(user.uid,1).then(res =>{
         this.toas.success("Se ha Aceptado con éxito al cliente");
    });
  }
  rechazar(user:any)
  {
    this.auth.updateEstadoUsuario(user.uid,-1).then(res =>{
      this.toas.success("Se ha rechazado con éxito al Cliente");
    })
     
  }

}
