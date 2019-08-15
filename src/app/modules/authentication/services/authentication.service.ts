import { Authentication } from '../authentication';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.setItem(USER_KEY, '');
      }
    });
  }

  token: Authentication = null;

  isAuthenticated(): boolean {
    const localUser = localStorage.getItem(USER_KEY);
    return localUser ? (JSON.parse(localUser) ? true : false) : false;
  }

  logIn(authentication: Authentication): Observable<boolean> {
    const authObservable = from(this.afAuth.auth.signInWithEmailAndPassword(authentication.email, authentication.password));
    return authObservable.pipe(
      map(user => user ? true : false)
    );
  }

  logOut() {
    from(this.afAuth.auth.signOut()).subscribe(() => localStorage.removeItem(USER_KEY));
  }

}
