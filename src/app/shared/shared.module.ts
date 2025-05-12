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
import { BotonTgfComponent } from './boton-tgf/boton-tgf.component';
import { BotonMasComponent } from './boton-mas/boton-mas.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BotonPerfilComponent,
    FooterComponent,
    BarraBusquedaComponent,
    BotonPerfilComponent,
    BotonCerrarComponent,
    BotonChatsComponent,
    BotonTgfComponent,
    BotonMasComponent
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
    BotonTgfComponent,
    BotonMasComponent
  ]
})
export class SharedModule { }
