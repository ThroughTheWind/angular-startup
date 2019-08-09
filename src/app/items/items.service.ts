import { Injectable } from '@angular/core';
import { Item } from './Item';

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

  getItem(id: string): Item {
    const item = DEFAULT_ITEMS.find(itm => itm.id === id);
    return item ? item : null;
  }

  addItem(item: Item): boolean {
    if (item) {
      const existing = DEFAULT_ITEMS.find(itm => itm.id === item.id);
      if (!existing) {
        DEFAULT_ITEMS.push(item);
        return true;
      }
    }
    return false;
  }

  updateItem(item: Item): boolean {
    if (item) {
      const existing = DEFAULT_ITEMS.find(itm => itm.id === item.id);
      if (existing) {
        DEFAULT_ITEMS[DEFAULT_ITEMS.indexOf(existing)] = item;
        return true;
      }
    }
    return false;
  }

  deleteItem(item: Item): boolean {
    if (item) {
      const index = DEFAULT_ITEMS.indexOf(item);
      if (index > -1) {
        DEFAULT_ITEMS.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  deleteItemById(id: string): boolean {
    if (id) {
      const existing = DEFAULT_ITEMS.find(itm => itm.id === id);
      return this.deleteItem(existing);
    }
    return false;
  }
}
