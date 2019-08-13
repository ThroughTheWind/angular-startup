import { Injectable } from '@angular/core';
import { Item } from './Item';
import { Observable, of } from 'rxjs';


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

  getItems(): Observable<Item[]> {
    return of(DEFAULT_ITEMS);
  }

  getItem(id: string): Observable<Item> {
    const item = DEFAULT_ITEMS.find(itm => itm.id === id);
    return of(item ? item : null);
  }

  addItem(item: Item): Observable<boolean> {
    if (item) {
      const existing = DEFAULT_ITEMS.find(itm => itm.id === item.id);
      if (!existing) {
        DEFAULT_ITEMS.push(item);
        return of(true);
      }
    }
    return of(false);
  }

  updateItem(item: Item): Observable<boolean> {
    if (item) {
      const existing = DEFAULT_ITEMS.find(itm => itm.id === item.id);
      if (existing) {
        DEFAULT_ITEMS[DEFAULT_ITEMS.indexOf(existing)] = item;
        return of(true);
      }
    }
    return of(false);
  }

  deleteItem(item: Item): Observable<boolean> {
    if (item) {
      const index = DEFAULT_ITEMS.indexOf(item);
      if (index > -1) {
        DEFAULT_ITEMS.splice(index, 1);
        return of(true);
      }
    }
    return of(false);
  }

  deleteItemById(id: string): Observable<boolean> {
    if (id) {
      const existing = DEFAULT_ITEMS.find(itm => itm.id === id);
      return this.deleteItem(existing);
    }
    return of(false);
  }

  checkIdNotTaken(id: string): Observable<boolean> {
    if (id) {
      const existing = DEFAULT_ITEMS.find(itm => itm.id === id);
      if (!existing) {
        return of(true);
      }
    }
    return of(false);

  }
}
