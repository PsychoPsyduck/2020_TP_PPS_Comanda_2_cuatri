import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';
import { FotoService } from 'src/app/servicios/foto.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { ScanerService } from '../../servicios/scaner.service';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

const { PushNotifications } = Plugins;

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
  aux;

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
              public toas:ToastrService,
              private fotoService: FotoService ) { }

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
   
    let tokenA :any;
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });
    
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
    (token: PushNotificationToken) => {
     //  alert('Push registration success, token: ' + token.value);
        console.log('Push registration success, token: ')
        console.log(token.value);
        tokenA = token.value;
        console.log("envio de notificacion");
        console.log("llega");
        this.form.controls['perfil'].setValue('Cliente');
        const { nombre, apellido, mail, clave, dni, cuil, perfil, img } = this.form.value;
        let usuario = {
          nombre: nombre,
          apellido: apellido,
          mail: mail,
          pass: clave,
          dni: dni,
          perfil:perfil,
          cuil: cuil,
          img: img,
          estado:0,
          token: tokenA,
        }
    
        if (this.form.valid) {
          this.authService.register(usuario.mail, usuario.pass, usuario).then(res => {
              //console.log("llega bien perri");
              this.toas.success("Cliente registrado con éxito");
              this.authService.registrar("dYMXr1MLTQetBD39hSUR4B:APA91bFCFeJ2TkMGtfhvd2rZDuLqJaip2TEylJHCw_tXVzFkKnwyhvZ-X6ztBXINBjSZMS0N64Sd0L80FPJe3zu-45cuSV7rUn-hqHxtqIp3TNmfMqGTrbBJxrjmm3qFAqg2kFlHr61i","Nuevo usuario","Confirmar Usuario",usuario.img).toPromise().then(res =>{
                console.info(res);
              })
    
          }).catch(err => {console.log(err)
              this.toas.error("Ocurrió un error a la hora del Registro");
          });;
        }else
        {
          this.toas.error("Datos inválidos");
    
        }
      }
    );
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


  tomarFoto() {
    const { nombre, apellido, mail } = this.form.value;

    let usuario = {
      nombre: nombre,
      apellido: apellido,
      mail: mail
    }

    this.fotoService.takePhoto()
      .then(imageData => {
        if (imageData !== 'No Image Selected') {
          this.subirFoto(imageData, usuario);
        } else {
          // this.toastService.errorToast('No tomó la foto.');
        }
      })
      .catch(error => {
        // this.toastService.errorToast('Error: No se ha podido cargar la foto. ' + error.message);
      });   
  }

  subirFoto(imageData, usuario) {
    this.fotoService.uploadPhoto(imageData, usuario)
      .then(res => {
        this.form.controls['img'].setValue(res);
        this.aux = res;
        // this.toastService.confirmationToast("Foto guardada")
      })
      .catch(err => {
        // this.toastService.errorToast('Error: No se ha podido guardar la foto. ' + err.message);
      })
  }
}
