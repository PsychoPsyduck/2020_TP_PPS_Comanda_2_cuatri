import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ScanerService } from '../../servicios/scaner.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.page.html',
  styleUrls: ['./registro-cliente.page.scss'],
})
export class RegistroClientePage implements OnInit {

  form: FormGroup;
  logeando=true;
  ocultarVerificar: boolean;
  resultado:any;

  esProfesional = false;
  esAdmin = false;


  usuarios = [
    {value: 'admin', viewValue: 'Administrador'},
    {value: 'profesional', viewValue: 'Profesional'},
    {value: 'usuario', viewValue: 'Usuario'}
  ];

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private dataService: DataService,
              private usuarioService: UsuarioService,
              private scanner: ScanerService,
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

    if (this.form.valid) {
      this.authService.register(usuario.mail, usuario.pass, usuario).then(res => {
          console.log("llega bien perri");
      }).catch(err => console.log(err));;
    }
  }

  seleccionUsuario() {
    const { perfil } = this.form.value;

    if (perfil == "admin") {
      this.esAdmin = true;
      this.esProfesional = false
    } else {
      this.esAdmin = false;
      this.esProfesional = true
    }
  }

  scan() {
    this.scanner.scan().then(res=>{
        
     this.resultado = res.text;
    })
   }

}
