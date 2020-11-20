import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { timer } from 'rxjs';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import { AuthService } from './servicios/auth.service';
import { Router } from '@angular/router';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  showSplash = true;
  clase = "candado ld ld-blur-in";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth:AuthService,
    private roure:Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      timer(6000).subscribe(() => this.showSplash = false)
    });
  }
 
  ngOnInit() {

  //   this.auth.registrar("dYMXr1MLTQetBD39hSUR4B:APA91bFCFeJ2TkMGtfhvd2rZDuLqJaip2TEylJHCw_tXVzFkKnwyhvZ-X6ztBXINBjSZMS0N64Sd0L80FPJe3zu-45cuSV7rUn-hqHxtqIp3TNmfMqGTrbBJxrjmm3qFAqg2kFlHr61i").toPromise().then(res=>{
  //     console.log("llega");
  //    console.info(res);
  //  }).catch(error=>{
  //    console.log("Mal");

  //    console.info(error);
  //  })
    console.log('Initializing HomePage');
    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });
    
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
    (token: PushNotificationToken) => {
      // alert('Push registration success, token: ' + token.value);
      console.log('Push registration success, token: ')
      console.log(token.value);
      console.log("envio de notificacion");
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
       // alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
       // alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
      //  alert('Push action performed: ' + JSON.stringify(notification));
        this.roure.navigate(['/home']);
        console.log(JSON.stringify(notification));
      }
    );

    
}




}
