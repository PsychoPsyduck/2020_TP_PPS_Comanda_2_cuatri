import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { firebaseConfig } from '../environments/environment';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
// Initialize Cloud Firestore through Firebase
firebase.initializeApp(firebaseConfig);

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage'
import { AngularFireDatabaseModule } from '@angular/fire/database'

//QR 
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

//alertas
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';


//Foto
import { Camera } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { PedidoComponent } from '../app/componentes/pedido/pedido.component';

//fcm
import { FcmService } from "../app/servicios/fcm.service";
import { JuegoComponent } from './componentes/juego/juego.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { EstadoPipe } from './pipes/estado.pipe';
import { DescuentoPipe } from './pipes/descuento.pipe';
import { DetalleCuentaComponent } from './componentes/detalle-cuenta/detalle-cuenta.component';
import { DescuentoComponentePipe } from './pipes/descuento-componente.pipe';
import { ConsultarMozoComponent } from './componentes/consultar-mozo/consultar-mozo.component';
import { ImagenesComponent } from './componentes/imagenes/imagenes.component';
import { VerPedidoComponent } from './componentes/ver-pedido/ver-pedido.component';


@NgModule({
  declarations: [
    AppComponent, 
    PedidoComponent, 
    JuegoComponent, 
    EncuestaComponent, 
    DetalleCuentaComponent,
    DescuentoComponentePipe,
    ImagenesComponent,
    ConsultarMozoComponent,
    VerPedidoComponent
    // EstadoPipe
  ],
  entryComponents: [PedidoComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    
  ],
  providers: [ 
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    Camera,
    ImagePicker,
    FcmService,
    // EstadoPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
