import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firebase } from "@ionic-native/firebase";


@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private afs:AngularFirestore, private platform:Platform) {

    
   }

  //  async token(){ 
  //    let token;
  //   token = Firebase.getToken();

  //   return this.saveToken(token)
  //  } 
   
  //  saveToken(token){
  //      if(!token) return;
  //   const devicesRef = this.afs.collection('divices');
  //   const docData={
  //     token,
  //     userid:'testUser',
  //   }

  //   return devicesRef.doc(token).set(docData)

  //  }

  //  listenToNotification(){
  //    return Firebase.onNotificationOpen();
  //  }

}
