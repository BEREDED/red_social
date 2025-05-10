import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForoRoutingModule } from './foro-routing.module';
import { MainComponent } from './main/main.component';
import { SideComponent } from './side/side.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainComponent,
    SideComponent
  ],
  imports: [
    CommonModule,
    ForoRoutingModule,
    SharedModule
  ]

})
export class ForoModule { }
