import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/servicios/data.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-consultar-mozo',
  templateUrl: './consultar-mozo.component.html',
  styleUrls: ['./consultar-mozo.component.scss'],
})
export class ConsultarMozoComponent implements OnInit {
 
  usuario:any = Usuario;
  consulta:any;
  mensaje:any
  constructor(private modal: ModalController,private data:DataService, private cons:UsuarioService) { }

  ngOnInit() {

    this.data.getConsultas().subscribe(res=>{
      this.consulta = res.filter(a => a.usuario.uid == this.usuario.uid)
    }) 
    
  }

  closeModal() {
    this.modal.dismiss();
  }
  enviar()
  {
      this.cons.addConsulta(this.mensaje,this.usuario).then(res =>{
        console.log("Se guardo bien");
      }).catch(error =>{console.log(error)})

      this.mensaje = "";
  }

}
