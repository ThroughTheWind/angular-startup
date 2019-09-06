import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from '../authentication/guards/authentication.guard';

import { PostsComponent } from './components/posts.component';
import { PostsEditComponent } from './components/post-edit/post-edit.component';
import { PostsListComponent } from './components/post-list/post-list.component';

const routes: Routes =  [
  {
    path: 'posts',
    component: PostsComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: PostsListComponent },
          { path: 'create', component: PostsEditComponent, canActivate: [AuthenticationGuard] },
          { path: 'edit/:id', component: PostsEditComponent, canActivate: [AuthenticationGuard] }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
