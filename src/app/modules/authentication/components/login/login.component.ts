import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


import { AuthenticationService } from '../../services/authentication.service';
import { Authentication } from '../../authentication';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  authForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  get username() {return this.authForm.get('username'); }
  get password() {return this.authForm.get('password'); }
  invalidCredentials = false;

  constructor(private authenticationService: AuthenticationService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    const credentials = this.fetchAuthentication();
    if (credentials) {
      this.invalidCredentials = false;
      this.authenticationService.logIn(credentials)
        .subscribe(isLoggedIn => {
          if (isLoggedIn) {
            this.navigateToHome();
          } else {
            this.invalidCredentials = true;
          }
        });
    }
  }

  navigateToHome() {
    this.router.navigate(['authentication']);
  }

  fetchAuthentication() {
    return this.authForm.valid ? this.authForm.value as Authentication : null;
  }
}
