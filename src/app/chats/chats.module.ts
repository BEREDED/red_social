import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Importar IonicModule
import { FormsModule } from '@angular/forms'; // Agregar FormsModule


import { ChatsRoutingModule } from './chats-routing.module';
import { MainChatComponent } from './main-chat/main-chat.component';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { ListaComponent } from './lista/lista.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { InputComponent } from './input/input.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainChatComponent,
    SidePanelComponent,
    ChatWindowComponent,
    ChatHeaderComponent,
    ChatWindowComponent,
    InputComponent,
    ListaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, // Agregar FormsModule aquí
    ChatsRoutingModule,
    SharedModule,
    IonicModule,

  ]
})
export class ChatsModule { }
