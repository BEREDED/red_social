import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModificarPerfilRoutingModule } from './modificar-perfil-routing.module';
import { RegistroModule } from '../registro/registro.module';
import { FotoComponent } from './foto/foto.component';
import { PrincipalModComponent } from './principal-mod/principal-mod.component';
import { InicioSesionModule } from '../inicio-sesion/inicio-sesion.module';
import { SharedModule } from '../shared/shared.module';
import { IonContent } from '@ionic/angular/standalone';
import { RouterEvent, RouterLink, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    FotoComponent,
    PrincipalModComponent
  ],
  imports: [
    CommonModule,
    ModificarPerfilRoutingModule,
    InicioSesionModule,
    SharedModule,
    IonContent,
    RouterModule
  ]
})
export class ModificarPerfilModule { }
