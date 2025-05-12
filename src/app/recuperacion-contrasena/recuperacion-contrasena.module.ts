import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecuperacionContrasenaRoutingModule } from './recuperacion-contrasena-routing.module';
import { RegistroModule } from '../registro/registro.module';
import { PrinRecComponent } from './prin-rec/prin-rec.component';
import { InicioSesionModule } from '../inicio-sesion/inicio-sesion.module';
import { IonContent } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PrinRecComponent
  ],
  imports: [
    CommonModule,
    RecuperacionContrasenaRoutingModule,
    RegistroModule,
    InicioSesionModule,
    IonicModule,
    RouterModule
  ]
})
export class RecuperacionContrasenaModule { }
