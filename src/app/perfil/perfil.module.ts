import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { SharedModule } from '../shared/shared.module';
import { IonContent } from '@ionic/angular/standalone';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule,
    IonContent
  ]
})
export class PerfilModule { }
