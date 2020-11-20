import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient,
    public db: AngularFirestore,
    public afs: AngularFireStorage,
    public toastController: ToastController
  ) {}

  public crearUsuario(objeto: any, uid: string): Promise<DocumentReference> {
    console.log('Entro al crearUsuario');
    console.log('objeto', objeto);
    
    return new Promise((resolve,reject) => {​​​​
      this.db.collection("usuarios").doc(uid).set({
        uid:uid,
        nombre: objeto.nombre,
        apellido: objeto.apellido,
        mail: objeto.mail,
        pass: objeto.pass,
        dni: objeto.dni,
        perfil:objeto.perfil,
        cuil: objeto.cuil,
        estado:0,
        img: objeto.img,
        token:objeto.token,
        
        }).then(res => {
        console.log('Llega bien perri');
      }).catch(err => console.log(err));
    });
  }
}
