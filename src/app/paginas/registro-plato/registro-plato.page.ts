import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { FotoService } from 'src/app/servicios/foto.service';

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
              public alertController: AlertController,
              private fotoService: FotoService) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      tipo: ['', Validators.required],
      img1: ['', Validators.required],
      img2: ['', Validators.required],
      img3: ['', Validators.required]
    });
  }

  crear(){
    const { nombre, descripcion, precio, tipo, img1, img2, img3 } = this.form.value;

    let plato = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      tipo: tipo,
      img1: img1,
      img2: img2,
      img3: img3
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

  tomarFoto(img) {
    const { nombre, tipo } = this.form.value;

    let comida = {
      nombre: nombre,
      tipo: tipo
    }

    this.fotoService.takePhoto()
      .then(imageData => {
        if (imageData !== 'No Image Selected') {
          this.subirFoto(imageData, comida, img);
        } else {
          // this.toastService.errorToast('No tomó la foto.');
        }
      })
      .catch(error => {
        // this.toastService.errorToast('Error: No se ha podido cargar la foto. ' + error.message);
      });   
  }

  subirFoto(imageData, comida, img) {
    this.fotoService.uploadPhotoComida(imageData, comida)
      .then(res => {
        this.form.controls[img].setValue(res);
        // this.toastService.confirmationToast("Foto guardada")
      })
      .catch(err => {
        // this.toastService.errorToast('Error: No se ha podido guardar la foto. ' + err.message);
      })
  }
}
