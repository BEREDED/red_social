import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModificarPerfilRoutingModule } from './modificar-perfil-routing.module';
import { RegistroModule } from '../registro/registro.module';
import { FotoComponent } from './foto/foto.component';
import { BoletaComponent } from './boleta/boleta.component';
import { PrincipalModComponent } from './principal-mod/principal-mod.component';
import { InicioSesionModule } from '../inicio-sesion/inicio-sesion.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FotoComponent,
    BoletaComponent,
    PrincipalModComponent
  ],
  imports: [
    CommonModule,
    ModificarPerfilRoutingModule,
    InicioSesionModule,
    SharedModule
  ]
})
export class ModificarPerfilModule { }
