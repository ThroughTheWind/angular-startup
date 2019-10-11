import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { GuardedComponent } from './pages/guarded/guarded.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

import { AuthenticationGuard } from './guards/authentication.guard';
import { AnonymousGuard } from './guards/anonymous.guard';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './components/main/main.component';


const routes: Routes = [
  {
    path: 'authentication',
    component: MainComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
          { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
          { path: 'guarded', component: GuardedComponent, canActivate: [AuthenticationGuard] },
          { path: '401', component: UnauthorizedComponent }
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
