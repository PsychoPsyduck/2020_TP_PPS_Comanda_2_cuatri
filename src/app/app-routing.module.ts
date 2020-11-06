import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./paginas/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registro-adm',
    loadChildren: () => import('./paginas/registro-adm/registro-adm.module').then( m => m.RegistroAdmPageModule)
  },  {
    path: 'registro-plato',
    loadChildren: () => import('./paginas/registro-plato/registro-plato.module').then( m => m.RegistroPlatoPageModule)
  },
  {
    path: 'registro-mesa',
    loadChildren: () => import('./paginas/registro-mesa/registro-mesa.module').then( m => m.RegistroMesaPageModule)
  },
  {
    path: 'envio-domicilio',
    loadChildren: () => import('./paginas/envio-domicilio/envio-domicilio.module').then( m => m.EnvioDomicilioPageModule)
  },
  {
    path: 'pedir-mesa',
    loadChildren: () => import('./paginas/pedir-mesa/pedir-mesa.module').then( m => m.PedirMesaPageModule)
  },
  {
    path: 'reservar-mesa',
    loadChildren: () => import('./paginas/reservar-mesa/reservar-mesa.module').then( m => m.ReservarMesaPageModule)
  },
  {
    path: 'registro-cliente',
    loadChildren: () => import('./paginas/registro-cliente/registro-cliente.module').then( m => m.RegistroClientePageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
