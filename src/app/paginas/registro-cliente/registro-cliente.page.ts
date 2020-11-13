import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
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
              public alertController: AlertController,
              public toas:ToastrService ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      mail: ['', Validators.required],
      clave: ['', Validators.required],
      dni: ['', Validators.required],
      cuil: ['', Validators.required],
      perfil: ['', Validators.required],
     // img: ['', Validators.required]
    });
   
  }

  crear(){
    console.log("llega");
    this.form.controls['perfil'].setValue('Cliente');
    const { nombre, apellido, mail, clave, dni, cuil, perfil, /*img */} = this.form.value;
    let usuario = {
      nombre: nombre,
      apellido: apellido,
      mail: mail,
      pass: clave,
      dni: dni,
      perfil:perfil,
      cuil: cuil,
      estado:0
     // img: img
    }

    if (this.form.valid) {
      this.authService.register(usuario.mail, usuario.pass, usuario).then(res => {
          //console.log("llega bien perri");
          this.toas.success("Cliente registrado con éxito");

      }).catch(err => {console.log(err)
          this.toas.error("Ocurrió un error a la hora del Registro");
      });;
    }else
    {
      this.toas.error("Datos inválidos");

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


   LeerDni() {
 
    const opciones: BarcodeScannerOptions = {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      //saveHistory: true, // Android, save scan history (default false)
      prompt: "Scanee el DNI", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: "PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: false // iOS and Android
    } 

    // this.scanner.scan().then(res=>{
       
    //   this.resultado = res.text;
    //  })
  
    this.scanner.scan2(opciones).then(barcodeData => {
      //console.log('Barcode data', barcodeData);
  
      var split = barcodeData.text.split("@");
      console.log(split);
      if(split.length > 9)
      {
        this.form.controls['nombre'].setValue(split[5]);
        this.form.controls['apellido'].setValue(split[4]);
        this.form.controls['dni'].setValue(parseInt(split[1]));
        this.form.controls['perfil'].setValue('Cliente');

      }
      else{
        this.form.controls['nombre'].setValue(split[2]);
        this.form.controls['apellido'].setValue(split[1]);
        this.form.controls['dni'].setValue(parseInt(split[4]));
        this.form.controls['perfil'].setValue('Cliente');
      }
  
    }).catch(err => {
      console.log('Error', err);
    });
  
  }



}
