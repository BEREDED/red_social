import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRoutingModule } from './principal-routing.module';

import { PrinPrinComponent } from './prin-prin/prin-prin.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PrinPrinComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    PrincipalRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class PrincipalModule { }
