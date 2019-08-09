import { Authentication } from '../authentication';
import { Injectable } from '@angular/core';

const DEFAULT_USERS: Authentication[] = [{
  username: 'TestUser',
  password: 'TestPwd'
}, {
  username: 'TestUser2',
  password: 'TestPwd2'
}];

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  token: Authentication = null;

  isAuthenticated() {
    return this.token ? true : false;
  }

  logIn(authentication: Authentication): boolean {
    const user = DEFAULT_USERS.find(tmp => tmp.username === authentication.username);
    if (user) {
      this.token = user.password === authentication.password ? authentication : null;
      return this.token ? true : false;
    }
    return false;
  }

  logOut() {
    this.token = null;
  }

}
