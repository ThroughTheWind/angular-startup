import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';

import { AuthenticationComponent } from './components/authentication.component';
import { LoginComponent } from './components/login/login.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { GuardedComponent } from './components/guarded/guarded.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    GuardedComponent,
    UnauthorizedComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class AuthenticationModule { }
