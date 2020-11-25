import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/clases/usuario';
import { DataService } from 'src/app/servicios/data.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-respuesta-mozo',
  templateUrl: './respuesta-mozo.component.html',
  styleUrls: ['./respuesta-mozo.component.scss'],
})
export class RespuestaMozoComponent implements OnInit {

  usuario:any = Usuario;
  mozo:any;
  consultaRecibida:any;
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
    console.log("llega");
      this.cons.responderConsulta(this.consultaRecibida.id,this.mensaje,this.mozo).then(res=>{
        console.log("Se respondió bien");
      })
      this.mensaje = "";

  }

}
