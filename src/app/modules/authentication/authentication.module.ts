import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';

import { LoginComponent } from './pages/login/login.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { GuardedComponent } from './pages/guarded/guarded.component';
import { RegisterComponent } from './pages/register/register.component';
import { MaterialModule } from '../../material.module';
import { MainComponent } from './components/main/main.component';


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    GuardedComponent,
    UnauthorizedComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MaterialModule
  ]
})
export class AuthenticationModule { }
