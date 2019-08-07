import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsEditComponent } from './items-edit/items-edit.component';

const routes: Routes = [
  { path: 'items/list', component: ItemsListComponent },
  { path: 'items/create', component: ItemsEditComponent },
  { path: 'items/edit/:id', component: ItemsEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
