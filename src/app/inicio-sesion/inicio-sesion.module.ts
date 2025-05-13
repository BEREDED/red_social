import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioSesionRoutingModule } from './inicio-sesion-routing.module';
import { CorreoComponent } from '../shared/correo/correo.component';
import { ContrasenaComponent } from '../shared/contrasena/contrasena.component';
import { ComponentePrinComponent } from './componente-prin/componente-prin.component';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RegistroModule } from "../registro/registro.module";
import { NombreComponent } from '../shared/nombre/nombre.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ComponentePrinComponent,
  ],
  imports: [
    CommonModule,
    InicioSesionRoutingModule,
    RouterModule,
    IonicModule,
    SharedModule
  ],
})
export class InicioSesionModule { }
