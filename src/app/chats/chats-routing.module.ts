import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainChatComponent } from './main-chat/main-chat.component';
import { SidePanelComponent } from './side-panel/side-panel.component';

import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{
  path: '',
  component: MainChatComponent,
}

];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ChatsRoutingModule { }
