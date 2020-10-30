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
      this.db.collection("usuarios").doc(uid).set(objeto).then(res => {
        console.log('Llega bien perri');
      }).catch(err => console.log(err));
    });
  }
}
