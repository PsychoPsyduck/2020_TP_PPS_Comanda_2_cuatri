import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { Imagen } from '../clases/imagen';
import { AuthService } from '../servicios/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  newName: string;
  dbRef: AngularFirestoreCollection<any>;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private db2: AngularFireDatabase,
    private fStorage: AngularFireStorage) {
    this.dbRef = this.db.collection("files");
  }

  uploadToStorage(info): AngularFireUploadTask {
    this.newName = `${new Date().getTime()}.jpeg`;
    let image = `data:image/jpeg;base64,${info}`;
    return this.fStorage.ref(`files/${this.newName}`).putString(image, 'data_url');
  }

  storeInfoDatabase(metainfo, url, usuario) {
    return this.dbRef.doc(this.newName).set({
      url: url,
      created: metainfo.timeCreated,
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      mail: usuario.mail
    });
  }

  storeInfoDatabaseComida(metainfo, url, comida) {
    return this.dbRef.doc(this.newName).set({
      url: url,
      created: metainfo.timeCreated,
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType,
      nombre: comida.nombre,
      tipo: comida.tipo
    });
  }
}
