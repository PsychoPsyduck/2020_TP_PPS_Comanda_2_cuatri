import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { rejects } from 'assert';
import { resolve } from 'dns';
import { ToastrService } from 'ngx-toastr';
import { promise } from 'protractor';
import { Observable, timer } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { DataService } from '../servicios/data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
   
  constructor (private auth:AuthService, private data:DataService,private toast:ToastrService,private route:Router)
  {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return new Promise((resolve,rejects )=>{
        
            this.auth.getCurrentUserMail().then(res => {
              if( res!=undefined)
              {    
              // return true;
                let usuario;
                let retorno = true;
                this.data.getUserByUid(res.uid).subscribe(us =>{
                    usuario = us;
                    console.info(usuario);
                    if(usuario.perfil == "Cliente")
                    {
                        if(res.emailVerified)
                        {
                          if(usuario.estado == 0)
                          {
                            this.route.navigate(['/cliente-espera']);
                            rejects(false);

                          }
                          else
                          { 

                            if(usuario.estado == -1)
                            {
                              this.route.navigate(['rechazo-cliente']);
                            }
                            else
                            {
                              resolve(true)

                            }

                          }
                         
                        }
                        else
                        {
                          this.toast.warning("Necesitás validar tu correo","Atención");
                          // alert("Necesitás estar logueado para ingresar a esta ruta")
                          this.route.navigate(['/verificacion']);
                        //  return false;
                        //retorno = false; 
                        resolve(false)

                        }
      
                    }
                    else
                    {  
                       
                      resolve(true)

                      
                    }
                });
                
              }
              else
              {  
                this.toast.error("Necesitás estar registrado para ingresar a esta ruta","Error");
                
                this.route.navigate(['/login']);
                resolve(false);

               
              }
          }).catch(res =>{
            this.toast.error(res,"Error");
         
            this.route.navigate(['/Login']);
            
            rejects(false);

          })
      });
   }
  
  
}
