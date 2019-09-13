import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';

import { PostsComponent } from './components/posts.component';
import { PostsEditComponent } from './components/post-edit/post-edit.component';
import { PostsListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';
import { ImagePickerModule } from 'src/app/shared/forms/image-picker/image-picker.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    PostsComponent,
    PostsListComponent,
    PostsEditComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PostsRoutingModule,
    ImagePickerModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule
  ]
})
export class PostsModule { }
