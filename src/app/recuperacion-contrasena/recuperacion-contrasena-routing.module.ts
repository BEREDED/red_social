import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrinRecComponent } from './prin-rec/prin-rec.component';

const routes: Routes = [
  {
    path:'',
    component:PrinRecComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecuperacionContrasenaRoutingModule { }
