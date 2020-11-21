import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference, QueryFn } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  dbUsersRef:AngularFirestoreCollection<any>;
  dbPedidosRef:AngularFirestoreCollection<any>;

  constructor(
    public http: HttpClient,
    public db: AngularFirestore,
    public afs: AngularFireStorage,
    public toastController: ToastController
  ) {
    this.dbUsersRef = this.db.collection("usuarios");
    this.dbPedidosRef = this.db.collection("pedidos");
  }

  traerColeccion(path: string, query: QueryFn = null): Observable<DocumentChangeAction<unknown>[]> {
    if(query == null)
      return this.db.collection(path).snapshotChanges();
    else
      return this.db.collection(path, query).snapshotChanges();
  }

  traerUno(path: string, campo: string, valor: string) {
    return this.db
      .collection(path)
      .ref.where(campo, "==", valor)
      .get()
      .then(documento => {
        if (documento.docs.length > 0) {
          const usuario = documento.docs[0].data();
          return usuario;
        } else {
          return null;
        }
      });
  }

  getAll(path:string) {
    return this.db.collection(path).valueChanges();
  }

  public crear(path: string, objeto: any): Promise<DocumentReference> {
    console.log('Entro al crear');
    console.log('path', path);
    console.log('objeto', objeto);
    return this.db.collection(path).add(objeto);
  }

  public actualizar(path: string, doc: string, valor: any) {
    return this.db
      .collection(path)
      .doc(doc)
      .update(valor);
  }

  public setear(path: string, doc: string, valor: any) {
    return this.db
      .collection(path)
      .doc(doc)
      .set(valor);
  }

  public TraerUnoPath(path: string, doc: string){
    return this.db
      .collection(path)
      .doc(doc)
      .get();
  }

  borrar(path: string, doc: string): void {
    console.log('pah', path, "doc", doc)
    this.db
      .collection(path)
      .doc(doc)
      .delete()
      .catch(error => this.handleError(error));
  }

  handleError(error) {
    this.mostrarToast(error);
  }
    
  getUserByUid(uid: string) {
    return this.dbUsersRef.doc(uid).valueChanges();
  }
 
  public crearConUID(path: string, objeto: any) {
    console.log('Entro al crear');
    console.log('path', path);
    console.log('objeto', objeto);
    return this.db.collection(path).add(objeto).then(res => {
      let doc = res;
      this.updateUID(path, doc.id);
    });
  }

  updateUID(path: string, uid: string) {
    return  this.db.collection(path).doc(uid).update({
      uid: uid,
    })
  }

  // subirImagenYTraerURl(path: string, imagenBase64: string): Promise<any> {
  //   let picData = ManejarDatosFoto(imagenBase64);
  //   let type = picData.type.split("/")[1];
  //   return this.afs.storage
  //     .ref(`${path}.${type}`)
  //     .putString(picData.pic, picData.base, {
  //       contentType: picData.type
  //     })
  //     .then(data => data.ref.getDownloadURL());
  // }

  async mostrarToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      position: "top",
      color: "danger"
    });
    toast.present();
  }

  // async getPendientesAutorizar()
  // {
  //      let turnos = [];
  //     let turnosUfs =  await this.dbUsersRef.ref.where("estado", "==", 0).where("perfil","==","Cliente").get();
        
  //     turnosUfs.docs.map(function(x){
  //       turnos.push(x.data());
  //   }); 

   
  //   return turnos;

  // }

  getUsuarios(){
    return this.dbUsersRef.valueChanges();
  }

  getPedidos(){
    return this.dbPedidosRef.valueChanges();
  }

  getaux() {
    return this.dbUsersRef.valueChanges();
  }
}
