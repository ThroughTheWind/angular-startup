import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ItemsRoutingModule } from './items-routing.module';

import { ItemsComponent } from './items/items.component';
import { ItemsEditComponent } from './items-edit/items-edit.component';
import { ItemsListComponent } from './items-list/items-list.component';
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
    FormsModule,
    ItemsRoutingModule
  ]
})
export class ItemsModule { }
