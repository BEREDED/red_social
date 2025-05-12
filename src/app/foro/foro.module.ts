import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular'; // Importar IonicModule

import { ForoRoutingModule } from './foro-routing.module';
import { MainComponent } from './main/main.component';
import { SideComponent } from './side/side.component';
import { PanelComponent } from './panel/panel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    SideComponent,
    PanelComponent
  ],
  imports: [
    CommonModule,
    ForoRoutingModule,
    SharedModule,
    IonicModule,
  ]

})
export class ForoModule { }
