import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication.service';
import { Authentication } from '../../authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  credentials: Authentication;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.credentials = {} as Authentication;
  }

  submit() {
    this.authenticationService.logIn(this.credentials)
    .subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.navigateToHome();
      }
    });
  }

  navigateToHome() {
    this.router.navigate(['authentication']);
  }

}
