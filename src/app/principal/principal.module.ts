import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRoutingModule } from './principal-routing.module';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { BotonCerrarComponent } from './boton-cerrar/boton-cerrar.component';
import { BotonChatsComponent } from './boton-chats/boton-chats.component';
import { BotonMasComponent } from './boton-mas/boton-mas.component';
import { BotonPerfilComponent } from './boton-perfil/boton-perfil.component';
import { BotonTgfComponent } from './boton-tgf/boton-tgf.component';
import { PrinPrinComponent } from './prin-prin/prin-prin.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BarraBusquedaComponent,
    BotonCerrarComponent,
    BotonChatsComponent,
    BotonMasComponent,
    BotonPerfilComponent,
    BotonTgfComponent,
    PrinPrinComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrincipalRoutingModule,
    FormsModule
  ]
})
export class PrincipalModule { }
