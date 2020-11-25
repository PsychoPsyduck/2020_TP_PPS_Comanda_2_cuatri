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

  agregarPedido(usuario: string, uid: string) { 
    return  this.db.collection('usuarios').doc(usuario).update({
      pedido: uid,
    }) 
  }

  addConsulta(consulta:any, user:any){
    console.log("llega consulta");
    return this.db.collection("consultas").ref.orderBy('id',"desc").limit(1).get().then(res=>{    
       res.forEach( a =>{
         
         console.log("info id");
         let id = Number(a.id) + 1;
         console.log(id);
          this.db.collection("consultas").doc(id.toString()).set({
           id:id,
           mesa: user.mesa.numero,
           estado:0,
           usuario: user,
           consulta: consulta,
       
          })
 
       })
     
     
     })
     
   }

   

   responderConsulta(idConsulta,respuesta,mozo)
   { 

      return  this.db.collection('consultas').doc(idConsulta.toString()).update({
        respuesta: respuesta,
        mozo:mozo,
        estado:1,
      
      
      }) 


   }
 


}
