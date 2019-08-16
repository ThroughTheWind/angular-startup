import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { Item } from '../models/Item';
import { Observable, from } from 'rxjs';
import { map, debounceTime, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private itemsCollection: AngularFirestoreCollection<Item>;

  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<Item>('items');
  }

  getItems(): Observable<Item[]> {
    return this.db.collection<Item>('items').valueChanges();
  }

  getItem(id: string): Observable<Item> {
    return this.itemsCollection.doc<Item>(id).valueChanges();
  }

  addItem(item: Item) {
    return new Observable(observer => {
      if (!item) { observer.error('Can\'t create a null item'); }
      // Generate id with firebase util
      const idGenerated = this.db.createId();
      item.id = idGenerated;
      // Set item to id generated
      this.itemsCollection.doc(idGenerated).set(item).then(() => observer.next(), () => observer.error('Error creating item'));
    });
  }

  updateItem(item: Item) {
    return new Observable(observer => {
      if (!item) { observer.error('Item can\'t be null'); }
      this.itemsCollection.doc(item.id).update(item).then(() => observer.next(), () => observer.error('Error updating item'));
    });
  }

  deleteItem(item: Item) {
    return new Observable(observer => {
      if (!item) { observer.error('Item can\'t be null'); }
      this.deleteItemById(item.id).subscribe(() => observer.next(), (errMessage) => observer.error(errMessage));
    });
  }

  deleteItemById(id: string) {
    return new Observable(observer => {
      if (!id) { observer.error('Id can\'t be null'); }
      this.itemsCollection.doc(id).delete().then(() => observer.next(), () => observer.error('Error deleting item'));
    });
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
