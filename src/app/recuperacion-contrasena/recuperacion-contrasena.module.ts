import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecuperacionContrasenaRoutingModule } from './recuperacion-contrasena-routing.module';
import { RegistroModule } from '../registro/registro.module';
import { PrinRecComponent } from './prin-rec/prin-rec.component';
import { InicioSesionModule } from '../inicio-sesion/inicio-sesion.module';


@NgModule({
  declarations: [
    PrinRecComponent
  ],
  imports: [
    CommonModule,
    RecuperacionContrasenaRoutingModule,
    RegistroModule,
    InicioSesionModule
  ]
})
export class RecuperacionContrasenaModule { }
