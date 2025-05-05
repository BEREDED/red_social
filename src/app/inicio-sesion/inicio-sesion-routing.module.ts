import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentePrinComponent } from './componente-prin/componente-prin.component';

const routes: Routes = [
  {
    path:'',
    component:ComponentePrinComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioSesionRoutingModule { }
