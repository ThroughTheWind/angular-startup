import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './components/authentication.component';
import { LoginComponent } from './components/login/login.component';
import { GuardedComponent } from './components/guarded/guarded.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

import { AuthenticationGuard } from './guards/authentication.guard';
import { AnonymousGuard } from './guards/anonymous.guard';


const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
          { path: 'guarded', component: GuardedComponent, canActivate: [AuthenticationGuard] },
          { path: '402', component: UnauthorizedComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
