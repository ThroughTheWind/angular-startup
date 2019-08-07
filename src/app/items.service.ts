import { Injectable } from '@angular/core';
import { Item } from './models/Item';

const DEFAULT_ITEMS: Item[] = [{
  id: '1',
  name: 'Name 1',
  description: 'Description 1'
}, {
  id: '2',
  name: 'Name 2',
  description: 'Description 2'
}];

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }

  getItems(): Item[] {
    return DEFAULT_ITEMS;
  }

  addItem(item: Item) {
    if (item) {
      DEFAULT_ITEMS.push(item);
    }
  }

  updateItem(item: Item) {
    if (item) {
      const existing = DEFAULT_ITEMS.find(itm => itm.id === item.id);
      if (existing) {
        DEFAULT_ITEMS[DEFAULT_ITEMS.indexOf(existing)] = item;
      }
    }
  }

  deleteItem(item: Item) {
    if (item) {
      const index = DEFAULT_ITEMS.indexOf(item);
      if (index > -1) {
        DEFAULT_ITEMS.splice(index, 1);
      }
    }
  }
}
