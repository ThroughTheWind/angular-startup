import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ItemsRoutingModule } from './items-routing.module';

import { ItemsComponent } from './components/items.component';
import { ItemsEditComponent } from './components/items-edit/items-edit.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { ItemComponent } from './components/item/item.component';

@NgModule({
  declarations: [
    ItemsComponent,
    ItemsListComponent,
    ItemsEditComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ItemsRoutingModule
  ]
})
export class ItemsModule { }
