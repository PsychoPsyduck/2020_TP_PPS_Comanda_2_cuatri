import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/servicios/data.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  mail: string;
  pass: string;
  msjError: string;
  logeando=true;
  ocultarVerificar: boolean;

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private dataService: DataService,
              public router: Router, 
              public alertController: AlertController) { }

  ngOnInit() {
    this.form = this.fb.group({
      mail: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  Entrar(){
    const { mail, clave } = this.form.value;

    this.authService.login(mail, clave).then( res => {
      this.router.navigate(['/home']);
    }).catch(err => this.presentAlert(err));
  }

  Registrar() {
    const { mail, clave } = this.form.value;

    this.authService.register(mail, clave).then(res => {
      this.router.navigate(['/login'])
    }).catch(err => this.presentAlert(err));
  }

  crear(){
    const { mail, clave } = this.form.value;

    let usuario = {
      mail: mail,
      pass: clave
    }

    this.dataService.crear("usuarios", usuario).then(res => {
      console.log("llega bien perri")
    }).catch(err => console.log(err));;
  }

  Limpiar(){
    this.form.setValue({
      mail: "",
      clave: ""
    });
  }

  async presentAlert(errores) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: errores,
      buttons: ['OK']
    });

    await alert.present();
  }

  Invitado() {
    this.form.setValue({
      mail: "admin@mail.com",
      clave: "adminmail"
    });
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
