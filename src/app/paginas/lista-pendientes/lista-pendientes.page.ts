import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-lista-pendientes',
  templateUrl: './lista-pendientes.page.html',
  styleUrls: ['./lista-pendientes.page.scss'],
})
export class ListaPendientesPage implements OnInit {
  
  lista:any;
  mesas:any;
  constructor(private data:DataService,private auth:AuthService,private toas:ToastrService) { }

  ngOnInit() {

    this.data.getUsuarios().subscribe(res=>{
      this.lista = res.filter(res => res.estado == 2 && res.perfil == "Cliente");
      console.info(this.lista);
    })

     this.data.getAll('mesas1').subscribe(res =>{
      console.info(res);
      this.mesas = res;
    });

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

  AsignarMesa(user:any)
  {  
    let lugar = false;
     for (let index = 0; index < this.mesas.length; index++) {
        console.log(this.mesas[index].estado);
       if(this.mesas[index].estado == 0)
       {   
        
          lugar = true;
          this.auth.updateEstadoMesa(this.mesas[index].numero,1).then(res =>{
             this.auth.updateMesaEstadoUsuario(user.uid,3,this.mesas[index]).then(res =>{

               
              this.auth.registrar("dYMXr1MLTQetBD39hSUR4B:APA91bFCFeJ2TkMGtfhvd2rZDuLqJaip2TEylJHCw_tXVzFkKnwyhvZ-X6ztBXINBjSZMS0N64Sd0L80FPJe3zu-45cuSV7rUn-hqHxtqIp3TNmfMqGTrbBJxrjmm3qFAqg2kFlHr61i","Mesa Asignada","Su mesa es la N° "+ this.mesas[index].numero ,"https://e00-expansion.uecdn.es/assets/multimedia/imagenes/2019/06/25/15614775255199.jpg").toPromise().then(res =>{
                console.info(res);
              }) 

              this.toas.success("Mesa N° " + this.mesas[index].numero + " asignada con éxito");
            }).catch(error =>{

              this.toas.error("ocurrió un error a la hora de asignar una mesa","Error")
            })
          }).catch(error =>{

            this.toas.error("ocurrió un error a la hora de asignar una mesa","Error")
          })

         break;
       }
       
     }    

     if(!lugar)
     {
       this.toas.error("No hay más mesas disnonible","Error");
 
     }

  }

}
