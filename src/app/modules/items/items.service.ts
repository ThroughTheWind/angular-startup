import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { Item } from './Item';
import { Observable, of } from 'rxjs';
import { map, filter, debounceTime, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
    console.log(this.items);
  }

  getItems(): Observable<Item[]> {
    return this.items;
  }

  getItem(id: string): Observable<Item> {
    return this.itemsCollection.doc<Item>(id).valueChanges();
  }

  addItem(item: Item) {
    const id = this.db.createId();
    item.id = id;
    this.itemsCollection.doc(id).set(item);
  }

  updateItem(item: Item) {
    if (item) {
      this.itemsCollection.doc(item.id).update(item);
    }
  }

  deleteItem(item: Item) {
    if (item) {
      this.deleteItemById(item.id);
    }
  }

  deleteItemById(id: string) {
    if (id) {
      this.itemsCollection.doc(id).delete();
    }
  }

  checkNameNotTaken(name: string, id: string = null): Observable<boolean> {
    // return of(true);
    return this.db.collection<Item>('items', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('name', '==', name);
      return query;
    }).valueChanges()
      .pipe(
        debounceTime(500),
        map(res => {
          const filteredRes = id ? res.filter(item => item.id !== id) : res;
          return filteredRes.length === 0;
        })
      );
  }
}
