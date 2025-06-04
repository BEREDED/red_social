import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalModComponent } from './principal-mod/principal-mod.component';

const routes: Routes = [
  {
    path:'',
    component:PrincipalModComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModificarPerfilRoutingModule { }
