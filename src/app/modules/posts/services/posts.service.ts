import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { Observable, from } from 'rxjs';
import { map, debounceTime, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postsCollection: AngularFirestoreCollection<Post>;

  constructor(private db: AngularFirestore) {
    this.postsCollection = db.collection<Post>('posts');
  }


  getPosts(): Observable<Post[]> {
    return this.db.collection<Post>('posts').valueChanges().pipe(
      map(posts => {
        return posts.map(post => {
          post.createdAt = new Date(post.createdAt['seconds'] * 1000);
          if(post.updatedAt) {
            post.updatedAt = new Date(post.updatedAt['seconds'] * 1000);
          }
          return post;
        });
      })
    );
  }

  getPost(id: string): Observable<Post> {
    return this.postsCollection.doc<Post>(id).valueChanges();
  }

  addPost(post: Post) {
    return new Observable(observer => {
      if (!post) { observer.error('Can\'t create a null post'); }
      // Generate id with firebase util
      const idGenerated = this.db.createId();
      post.id = idGenerated;
      post.createdAt = new Date();
      // Set post to id generated
      this.postsCollection.doc(idGenerated).set(post).then(() => observer.next(), () => observer.error('Error creating post'));
    });
  }

  updatePost(post: Post) {
    return new Observable(observer => {
      if (!post) { observer.error('Post can\'t be null'); }
      post.updatedAt = new Date();
      this.postsCollection.doc(post.id).update(post).then(() => observer.next(), () => observer.error('Error updating post'));
    });
  }

  deletePost(post: Post) {
    return new Observable(observer => {
      if (!post) { observer.error('Post can\'t be null'); }
      this.deletePostById(post.id).subscribe(() => observer.next(), (errMessage) => observer.error(errMessage));
    });
  }

  deletePostById(id: string) {
    return new Observable(observer => {
      if (!id) { observer.error('Id can\'t be null'); }
      this.postsCollection.doc(id).delete().then(() => observer.next(), () => observer.error('Error deleting post'));
    });
  }

  checkNameNotTaken(name: string, id: string = null): Observable<boolean> {
    // return of(true);
    return this.db.collection<Post>('posts', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('name', '==', name);
      return query;
    }).valueChanges()
      .pipe(
        debounceTime(500),
        map(res => {
          const filteredRes = id ? res.filter(post => post.id !== id) : res;
          return filteredRes.length === 0;
        })
      );
  }
}
