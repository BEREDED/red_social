import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular'; // Importar IonicModule

import { ForoRoutingModule } from './foro-routing.module';
import { MainComponent } from './main/main.component';
import { SideComponent } from './side/side.component';
import { PanelComponent } from './panel/panel.component';
import { PublishingComponent } from './publishing/publishing.component';
import { JoinExitComponent } from './join-exit/join-exit.component';
import { FeedComponent } from './feed/feed.component';
import { PostCardComponent } from './post-card/post-card.component';
import { CommentsSectionComponent } from './comments-section/comments-section.component';


import { SharedModule } from '../shared/shared.module';
//import { Post, Comment } from '../../modelos/post.interface';

@NgModule({
  declarations: [
    MainComponent,
    SideComponent,
    PanelComponent,
    FeedComponent,
    PublishingComponent,
    JoinExitComponent,
    PostCardComponent,
    CommentsSectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ForoRoutingModule,
    SharedModule,
    IonicModule,
    //  Post,
    //Comment,
  ]

})
export class ForoModule { }
