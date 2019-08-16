import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from './../authentication/guards/authentication.guard';

import { ItemsComponent } from './components/items.component';
import { ItemsEditComponent } from './components/items-edit/items-edit.component';
import { ItemsListComponent } from './components/items-list/items-list.component';

const routes: Routes =  [
  {
    path: 'items',
    component: ItemsComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'list', component: ItemsListComponent },
          { path: 'create', component: ItemsEditComponent, canActivate: [AuthenticationGuard] },
          { path: 'edit/:id', component: ItemsEditComponent, canActivate: [AuthenticationGuard] }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
