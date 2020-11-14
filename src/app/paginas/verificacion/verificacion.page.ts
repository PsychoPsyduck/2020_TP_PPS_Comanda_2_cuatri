import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.page.html',
  styleUrls: ['./verificacion.page.scss'],
})
export class VerificacionPage implements OnInit {
  
  email:any = "***@gmail.com";
  constructor(private auth:AuthService,private toast:ToastrService) { }

  ngOnInit() {
    
    //  this.auth.getCurrentUserMail().then(res =>{
    //    this.email = res.email;
    //  })
    
  }

  ionViewWillEnter()
  {
    this.auth.getCurrentUserMail().then(res =>{
      this.email = res.email;
    })
  }

  loguearse()
  {
    //this.route.navigate(['/Login']);
    this.auth.logOut();
  }
  rEmail(){
    this.auth.sendVerificationEmail().then(res =>{
      //alert("Email reenviado con Éxito");
      this.toast.success("Email reenviado con Éxito");
 
    }).catch(error =>{
       
      //alert(error);
      this.toast.error(error,"Error");

    })
  }



}
