import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsComponent } from './items/items.component';
import { ItemsEditComponent } from './items-edit/items-edit.component';
import { ItemsListComponent } from './items-list/items-list.component';

const routes: Routes =  [
  {
    path: 'items',
    component: ItemsComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'list', component: ItemsListComponent },
          { path: 'create', component: ItemsEditComponent },
          { path: 'edit/:id', component: ItemsEditComponent }
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
