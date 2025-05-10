import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import { BotonPerfilComponent } from './boton-perfil/boton-perfil.component';
import { BotonCerrarComponent } from './boton-cerrar/boton-cerrar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BarraBusquedaComponent,
    BotonPerfilComponent,
    BotonCerrarComponent

  ],
  imports: [
    CommonModule,
    FormsModule

  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BarraBusquedaComponent,
    BotonPerfilComponent,
    BotonCerrarComponent
  ]
})
export class SharedModule { }
