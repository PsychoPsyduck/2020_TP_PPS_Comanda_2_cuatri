import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  register(email: string, password: string, usuario: object) {
    return new Promise ((resolve, rejects) => { 
      firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
        this.usuarioService.crearUsuario(usuario, result.user.uid);
        resolve(result);
      }).catch((err) => rejects(err));
    });
  }

  login(email: string, password: string){
    return new Promise ((resolve, rejects) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
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

  getCurrentUserMail(): string {
    return firebase.auth().currentUser.email;
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