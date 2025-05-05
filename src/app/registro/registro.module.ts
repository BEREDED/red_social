import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { ContrasenaComponent } from '../inicio-sesion/contrasena/contrasena.component';
import { CorreoComponent } from '../inicio-sesion/correo/correo.component';
import { NombreComponent } from './nombre/nombre.component';
import { PrincipalComponent } from './principal/principal.component';
import { FechaNacimientoComponent } from './fecha-nacimiento/fecha-nacimiento.component';
import { ConfirmarContrasenaComponent } from './confirmar-contrasena/confirmar-contrasena.component';
import { InicioSesionModule } from '../inicio-sesion/inicio-sesion.module';
import { IonContent } from '@ionic/angular/standalone';


@NgModule({
  declarations: [
    NombreComponent,
    PrincipalComponent,
    FechaNacimientoComponent,
    ConfirmarContrasenaComponent

  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    InicioSesionModule,
    IonContent
  ],
  exports:[
    NombreComponent,
    FechaNacimientoComponent,
    ConfirmarContrasenaComponent,
  ]
})
export class RegistroModule { }
