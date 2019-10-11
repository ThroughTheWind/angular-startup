import { Authentication } from '../models/authentication';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

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
      map(user => {
        this.handleEmailLogin(user);
        return user ? true : false;
      })
    );
  }

  logOut() {
    from(this.afAuth.auth.signOut()).subscribe(() => localStorage.removeItem(USER_KEY));
  }

  facebookLogin(){
    return new Observable(observer => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        this.handleFacebookLogin(res);
        observer.next(res);
      }, err => {
        console.log(err);
        observer.error(err);
      })
    });
  }

  googleLogin(){
    return new Observable(observer => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          this.handleGoogleLogin(res);
          observer.next(res);
        }, err => {
          console.log(err);
          observer.error(err);
        });
    });
  }

  register(authentication: Authentication) {
    return new Observable(observer => {
      if(authentication.isValid()) {
        firebase.auth().createUserWithEmailAndPassword(authentication.email, authentication.password)
          .then((res) => {
            this.handleEmailRegister(res);
            observer.next(res);
          }, err => {
            console.log(err);
            observer.error(err);
          });
      } else {
        observer.error();
      }
    });
  }

  handleGoogleRegister(res: any) {

  }

  handleFacebookRegister(res: any) {
    
  }

  handleEmailRegister(res: any) {
    
  }

  handleGoogleLogin(res: any) {

  }

  handleFacebookLogin(res: any) {
    
  }

  handleEmailLogin(res: any) {
    
  }

}
