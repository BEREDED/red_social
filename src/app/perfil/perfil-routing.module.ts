import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PriPerfilComponent } from './pri-perfil/pri-perfil.component';

const routes: Routes = [
  {
    path: '',
    component:PriPerfilComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
