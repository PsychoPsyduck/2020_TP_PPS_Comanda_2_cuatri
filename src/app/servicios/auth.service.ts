import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;

  constructor(private router: Router, private usuarioService: UsuarioService, private toast:ToastrService,public angularFireAuth:AngularFireAuth, private db: AngularFirestore) { } 

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
        resolve(user);
        // if(!user.user.emailVerified)
        // {
        //   this.router.navigate(['/verificacion']);
          
        // }
        // else
        // {
        //   this.router.navigate(['/home']);
        // }
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
}