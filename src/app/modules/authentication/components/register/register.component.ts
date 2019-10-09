import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidateEmail } from '../../../../shared/forms/form.validators';
import { Authentication } from '../../models/authentication';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  animations: [
    trigger('emailLoginToggle', [
      state('opened', style({
        maxHeight: '400px',
        paddingTop: '16px'
      })),
      state('closed', style({
        maxHeight: '0px',
        paddingTop: '0px'
      })),
      transition('opened => closed', [
        animate('1s')
      ]),
      transition('closed => opened', [
        animate('1s')
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', [Validators.required, ValidateEmail]],
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required]]
  });

  get email() {return this.registerForm.get('email'); }
  get password() {return this.registerForm.get('password'); }
  get confirmPassword() {return this.registerForm.get('confirmPassword'); }
  apiError: any;

  emailLogin: string = 'closed';

  constructor(private authService: AuthenticationService, private fb: FormBuilder) { }

  ngOnInit() {
  }

  googleLogin() {
    this.apiError = null;
    this.authService.googleLogin()
      .subscribe(res => {

      }, err => {
        this.handleError(err);
      });
  }

  facebookLogin() {
    this.authService.facebookLogin()
      .subscribe(res => {

      }, err => {
        this.handleError(err);
      });
  }

  emailLoginClick() {
    if(this.emailLogin === 'opened') {
      this.emailLogin = 'closed';
    } else {
      this.emailLogin = 'opened';
    }
  }

  onSubmit() {
    if(!this.registerForm.valid) return;
    this.authService.register(this.registerForm.value as Authentication)
      .subscribe(res => {

      }, err => {
        this.handleError(err);
      });
  }

  handleError(err) {
    this.apiError = err;
  }
}
