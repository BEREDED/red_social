import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Importar IonicModule

import { ChatsRoutingModule } from './chats-routing.module';
import { MainChatComponent } from './main-chat/main-chat.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { ListaComponent } from './lista/lista.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainChatComponent,
    SidePanelComponent,
    ListaComponent,
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    SharedModule,
    IonicModule,

  ]
})
export class ChatsModule { }
