import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-registro-adm',
  templateUrl: './registro-adm.page.html',
  styleUrls: ['./registro-adm.page.scss'],
})
export class RegistroAdmPage implements OnInit {
  
  form: FormGroup;
  logeando=true;
  ocultarVerificar: boolean;

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private dataService: DataService,
              public router: Router, 
              public alertController: AlertController) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mail: ['', Validators.required],
      clave: ['', Validators.required],
      dni: ['', Validators.required],
      cuil: ['', Validators.required],
      perfil: ['', Validators.required],
      img: ['', Validators.required]
    });
  }

  crear(){
    const { nombre, apellido, mail, clave, dni, cuil, perfil, img } = this.form.value;

    let usuario = {
      nombre: nombre,
      apellido: apellido,
      mail: mail,
      pass: clave,
      dni: dni,
      cuil: cuil,
      perfil: perfil,
      img: img
    }

    this.dataService.crear("usuarios", usuario).then(res => {
      console.log("llega bien perri")
    }).catch(err => console.log(err));;
  }

  AutoLog(usuario) {
    switch (usuario) {
      case "jefe" :
        this.form.setValue({
          mail: "dueño@dueño.com",
          clave: "111111"
        });
        break;
      case "admin" :
        this.form.setValue({
          mail: "admin@admin.com",
          clave: "222222"
        });
        break;
      case "empleado" :
        this.form.setValue({
          mail: "empleado@empleado.com",
          clave: "333333"
        });
        break;
      case "cliente" :
        this.form.setValue({
          mail: "cliente@cliente.com",
          clave: "444444"
        });
        break;      
    }
  }
}
