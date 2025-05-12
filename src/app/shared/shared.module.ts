import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { BotonPerfilComponent } from './boton-perfil/boton-perfil.component';
import { BotonCerrarComponent } from './boton-cerrar/boton-cerrar.component';

import { BotonChatsComponent } from './boton-chats/boton-chats.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BarraBusquedaComponent,
    BotonPerfilComponent,
    BotonCerrarComponent,
    BotonChatsComponent,

  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    RouterLinkActive,
    FormsModule,
    IonicModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BarraBusquedaComponent,
    BotonPerfilComponent,
    BotonCerrarComponent,
    BotonChatsComponent,
  ]
})
export class SharedModule { }
