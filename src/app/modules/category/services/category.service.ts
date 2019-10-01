import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryCollection: AngularFirestoreCollection<Category>;

  constructor(private db: AngularFirestore) {
    this.categoryCollection = db.collection<Category>('categories');
  }

  getCategories(): Observable<Category[]> {
    return this.db.collection<Category>('categories').valueChanges();
  }

  getCategory(id: string): Observable<Category> {
    return this.categoryCollection.doc<Category>(id).valueChanges();
  }

  addCategory(category: Category) {
    return new Observable(observer => {
      if (!category) { observer.error('Can\'t create a null category'); }
      // Generate id with firebase util
      const idGenerated = this.db.createId();
      category.id = idGenerated;
      // Set post to id generated
      this.categoryCollection.doc(idGenerated).set(category)
        .then(
          () => observer.next(), 
          () => observer.error('Error creating category')
        );
    });
  }

  updateCategory(category: Category) {
    return new Observable(observer => {
      if (!category) { observer.error('Category can\'t be null'); }
      this.categoryCollection.doc(category.id).update(category)
        .then(
          () => observer.next(), 
          () => observer.error('Error updating post')
        );
    });
  }

  deleteCategory(category: Category) {
    return new Observable(observer => {
      if (!category) { observer.error('Post can\'t be null'); }
      this.deleteCategoryById(category.id).subscribe(
        () => observer.next(), 
        (errMessage) => observer.error(errMessage)
      );
    });
  }

  deleteCategoryById(id: string) {
    return new Observable(observer => {
      if (!id) { observer.error('Id can\'t be null'); }
      this.categoryCollection.doc(id).delete()
        .then(
          () => observer.next(), 
          () => observer.error('Error deleting category')
        );
    });
  }
}
