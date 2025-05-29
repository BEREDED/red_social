import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular'; // Importar IonicModule

import { ForoRoutingModule } from './foro-routing.module';
import { MainComponent } from './main/main.component';
import { SideComponent } from './side/side.component';
import { PanelComponent } from './panel/panel.component';
import { PublishingComponent } from './publishing/publishing.component';
import { FeedComponent } from './feed/feed.component';


import { SharedModule } from '../shared/shared.module';
//import { Post, Comment } from '../../modelos/post.interface.ts';

@NgModule({
  declarations: [
    MainComponent,
    SideComponent,
    PanelComponent,
    FeedComponent,
    PublishingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ForoRoutingModule,
    SharedModule,
    IonicModule,
  ]

})
export class ForoModule { }
