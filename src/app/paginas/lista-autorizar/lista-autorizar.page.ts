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
         
         this.auth.registrar("dYMXr1MLTQetBD39hSUR4B:APA91bFCFeJ2TkMGtfhvd2rZDuLqJaip2TEylJHCw_tXVzFkKnwyhvZ-X6ztBXINBjSZMS0N64Sd0L80FPJe3zu-45cuSV7rUn-hqHxtqIp3TNmfMqGTrbBJxrjmm3qFAqg2kFlHr61i","Aceptado","Bienvenido a nuestro Restaurate","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkOtM0mYv0ZXxL5CmRThkJf5zkIbao3E3CgQ&usqp=CAU").toPromise().then(res =>{
          console.info(res);
        })
         
    });
  }
  rechazar(user:any)
  {
    this.auth.updateEstadoUsuario(user.uid,-1).then(res =>{
      this.toas.success("Se ha rechazado con éxito al Cliente");
      this.auth.registrar("dYMXr1MLTQetBD39hSUR4B:APA91bFCFeJ2TkMGtfhvd2rZDuLqJaip2TEylJHCw_tXVzFkKnwyhvZ-X6ztBXINBjSZMS0N64Sd0L80FPJe3zu-45cuSV7rUn-hqHxtqIp3TNmfMqGTrbBJxrjmm3qFAqg2kFlHr61i","Rechazado","Lamentamos comunicarle que no fue aceptado para el ingreso al Restaurante","https://img.freepik.com/foto-gratis/hombre-triste-sosteniendo-cabeza-mano_1150-6346.jpg?size=626&ext=jpg").toPromise().then(res =>{
          console.info(res);
        })
    })
     
  }

}
