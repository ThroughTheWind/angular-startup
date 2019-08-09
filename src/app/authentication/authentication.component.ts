import { Router } from '@angular/router';
import { AuthenticationService } from './../authentication.service';
import { Authentication } from './../model/authentication';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.less']
})
export class AuthenticationComponent implements OnInit {

  credentials: Authentication;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.credentials = {} as Authentication;
    if (this.authenticationService.isAuthenticated()) {
      this.navigateToHome();
    }
  }

  submit() {
    if (this.authenticationService.logIn(this.credentials)) {
      this.navigateToHome();
    }
  }

  navigateToHome() {
    this.router.navigateByUrl('/');
  }

}
