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
import { SearchResultsComponent } from './search-results/search-results.component';

import { BotonChatsComponent } from './boton-chats/boton-chats.component';
import { BotonTgfComponent } from './boton-tgf/boton-tgf.component';
import { BotonMasComponent } from './boton-mas/boton-mas.component';
import { ContrasenaComponent } from './contrasena/contrasena.component';
import { CorreoComponent } from './correo/correo.component';
import { NombreComponent } from './nombre/nombre.component';
import { FechaNacimientoComponent } from './fecha-nacimiento/fecha-nacimiento.component';
import { ConfirmarContrasenaComponent } from './confirmar-contrasena/confirmar-contrasena.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BotonPerfilComponent,
    FooterComponent,
    BarraBusquedaComponent,
    BotonCerrarComponent,
    BotonChatsComponent,
    BotonTgfComponent,
    BotonMasComponent,
    ContrasenaComponent,
    CorreoComponent,
    FechaNacimientoComponent,
    ConfirmarContrasenaComponent,
    NombreComponent,
    SearchResultsComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    RouterLinkActive,
    FormsModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    BotonPerfilComponent,
    FooterComponent,
    BarraBusquedaComponent,
    BotonPerfilComponent,
    BotonCerrarComponent,
    BotonChatsComponent,
    BotonTgfComponent,
    BotonMasComponent,
    ContrasenaComponent,
    CorreoComponent,
    NombreComponent,
    FechaNacimientoComponent,
    ConfirmarContrasenaComponent,
    SearchResultsComponent,
  ]
})
export class SharedModule { }
