import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';

import { MainChatComponent } from './main-chat/main-chat.component';
import { SidePanelComponent } from './side-panel/side-panel.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainChatComponent,
    SidePanelComponent,
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    SharedModule,
  ]
})
export class ChatsModule { }
