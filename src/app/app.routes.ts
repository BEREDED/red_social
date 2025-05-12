import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path:'inicio_sesion',
    loadChildren: () => import('./inicio-sesion/inicio-sesion.module').then((m) => m.InicioSesionModule),
  }
  ,
  {
    path:'registro',
    loadChildren: () => import('./registro/registro.module').then((m) => m.RegistroModule),
  },
  {
    path:'perfil',
    loadChildren: () => import('./modificar-perfil/modificar-perfil.module').then((m) => m.ModificarPerfilModule),
  },
  {
    path:'recuperacion',
    loadChildren: () => import('./recuperacion-contrasena/recuperacion-contrasena.module').then((m) => m.RecuperacionContrasenaModule),
  },
  {
    path:'principal',
    loadChildren: () => import('./principal/principal.module').then((m) => m.PrincipalModule),
  },
  {
    path:'foro',
    loadChildren: () => import('./foro/foro.module').then((m) => m.ForoModule),
  },
  {
    path: '',
    redirectTo: 'inicio_sesion',
    pathMatch: 'full',
  },
];
