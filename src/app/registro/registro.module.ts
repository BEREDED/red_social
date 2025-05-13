import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { ContrasenaComponent } from '../shared/contrasena/contrasena.component';
import { CorreoComponent } from '../shared/correo/correo.component';
import { NombreComponent } from '../shared/nombre/nombre.component';
import { PrincipalComponent } from './principal/principal.component';
import { FechaNacimientoComponent } from '../shared/fecha-nacimiento/fecha-nacimiento.component';
import { ConfirmarContrasenaComponent } from '../shared/confirmar-contrasena/confirmar-contrasena.component';
import { InicioSesionModule } from '../inicio-sesion/inicio-sesion.module';
import { IonContent } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PrincipalComponent,
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    InicioSesionModule,
    IonContent,
    FormsModule,
    SharedModule
  ],
})
export class RegistroModule { }
