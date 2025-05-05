import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioSesionRoutingModule } from './inicio-sesion-routing.module';
import { CorreoComponent } from './correo/correo.component';
import { ContrasenaComponent } from './contrasena/contrasena.component';
import { ComponentePrinComponent } from './componente-prin/componente-prin.component';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';


@NgModule({
  declarations: [
    ComponentePrinComponent,
    CorreoComponent,
    ContrasenaComponent
  ],
  imports: [
    CommonModule,
    InicioSesionRoutingModule,
    RouterModule,
    IonContent
  ],
  exports:[
    ContrasenaComponent,
    CorreoComponent
  ]
})
export class InicioSesionModule { }
