import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';

@Component({
  selector: 'app-registro-plato',
  templateUrl: './registro-plato.page.html',
  styleUrls: ['./registro-plato.page.scss'],
})
export class RegistroPlatoPage implements OnInit {
  
  form: FormGroup;
  logeando=true;
  ocultarVerificar: boolean;

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
              public router: Router, 
              public alertController: AlertController) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      tipo: ['', Validators.required],
      img: ['', Validators.required]
    });
  }

  crear(){
    const { nombre, descripcion, precio, tipo, dni, cuil, perfil, img } = this.form.value;

    let plato = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      tipo: tipo,
      img: img
    }

    if (this.form.valid) {
      this.dataService.crear("platos", plato).then(res => {
        console.log("llega bien perri")
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
}
