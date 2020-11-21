import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './usuario.service';
import { HttpClient } from "@angular/common/http";
import { Platform } from '@ionic/angular';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
 
  usuarioaux = null;

  rutaNotification = "https://fcm.googleapis.com/fcm/send";
  constructor(private router: Router, private usuarioService: UsuarioService, private toast:ToastrService,public angularFireAuth:AngularFireAuth, private db: AngularFirestore, private http:HttpClient, private dataService:DataService) { } 

  async sendVerificationEmail(): Promise<void> {
    return (await this.angularFireAuth.currentUser).sendEmailVerification();
  }

  register(email: string, password: string, usuario: object) {
    var ad = this;
    return new Promise ((resolve, rejects) => { 
      firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
       
        ad.router.navigate(['/verificacion']);         

        ad.sendVerificationEmail().then(res =>{
        ad.toast.success("Se ha enviado un correo de verificación a la casilla especificada");
       }).catch(error =>{
         ad.toast.error("Ocurrió un errro a la hora de enviar el correo","Error");
       });  

        this.usuarioService.crearUsuario(usuario, result.user.uid);

        resolve(result);
      }).catch((err) => rejects(err));
    });
  }

  login(email: string, password: string){
    return new Promise ((resolve, rejects) => {
      this.angularFireAuth.signInWithEmailAndPassword(email, password).then(user => {
        let doc = user.user
        //consigue el usuario logeado 
        // this.getUser(doc.uid);
        resolve(user);
      }).catch(err => rejects(err));
    });
  }

  public logOut(){
    return new Promise ((resolve, rejects) => {
      firebase.auth().signOut().then(user => {
        resolve(user);
        this.router.navigate(['/login']);
      }).catch(err => rejects(err));
    });
  }

  getCurrentUserId(): string {
    return firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
  }

   getCurrentUserMail(){
    return this.angularFireAuth.currentUser;
  }

  getLogueado(){
    let user = this.angularFireAuth.currentUser;
    if(user != undefined && user != null)
    { 
   
      return true;
    }
    else
    {
      return false;
    }
  }

  updateEstadoUsuario(usuario:any,estado:number)
  { 
    return  this.db.collection('usuarios').doc(usuario).update({
      estado: estado,
      
    }) 

  }
  
  updateMesaEstadoUsuario(usuario:any,estado:number,mesa:any)
  { 

    return  this.db.collection('usuarios').doc(usuario).update({
      estado: estado,
      mesa:mesa,
      
    }) 
      
  }

  updateEstadoMesa(mesa:any,estado:number)
  {
    return  this.db.collection('mesas1').doc(mesa).update({
      estado: estado,
      
    }) 
  }

  prueba()
  {
    console.log("dale que tiene que llegar");
  }

  registrar(token:any,title:string,cuerpo:string,image?:string) {

    console.log("hola");
   /* let body = notificacion:{
      title: "Prueba post desde angular",
      body: "Funciona piola perri"
      }*/
    let body ={
        "notification":{
            "title": title,
            "body": cuerpo,
            "image":image,
    
        },
        "to":token,
    }


   let headers = {
      headers:{

        Authorization: 'Bearer ' + "AAAA_80FmeU:APA91bGUBHOqlTtiMO7VkRKrN9oLa8jPFh8a4MjC0T9TWIFg1CQjoYqDlzQ_CaiERFcoTsAVawTFdsmz4pBIXl5z9eDBNPlxTDB9Au_YUU1ANICambSYjjqWG43--nxogXrb7hWLAMpQ"
      }
    } 

    //console.info(body); 
    
    return this.http.post(this.rutaNotification,body,headers);
  }

  // registerNew(name:string, cuil:number,sexo:string,email:string,password:string)  {​​​​
  //   return new Promise((resolve,reject) => {​​​​
   
  //     this.AFauth.createUserWithEmailAndPassword(email,password).then(res=> {​​​​
  //       console.log(res.user.uid);
  //       const uid= res.user.uid;
  //       this.db.collection("usuarios").doc(res.user.uid).set({​​​​
  //         nombre: name,
  //         uid: uid,
  //         perfil: 'usuario',
  //         cuil:cuil,
  //         sexo:sexo
  //       }​​​​)
  //       resolve(res)
  //     }​​​​)
  //     .catch(error=> {​​​​ reject(error) }​​​​);
  //   }​​​​);
  // }​​​​

  getUser(uid: string) {
    this.dataService.getaux().subscribe(res => {
      this.usuarioaux = res.filter(x => x.uid == uid);
    });
  }
}