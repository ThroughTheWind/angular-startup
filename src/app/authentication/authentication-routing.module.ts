import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { GuardedComponent } from './guarded/guarded.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthenticationGuard } from './authentication.guard';
import { AnonymousGuard } from './anonymous.guard';


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
