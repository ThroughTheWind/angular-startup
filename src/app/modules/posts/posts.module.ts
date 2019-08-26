import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';

import { PostsComponent } from './components/posts.component';
import { PostsEditComponent } from './components/post-edit/post-edit.component';
import { PostsListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';

@NgModule({
  declarations: [
    PostsComponent,
    PostsListComponent,
    PostsEditComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
