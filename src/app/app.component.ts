import { Authentication } from './authentication/authentication';
import { AuthenticationService } from './authentication/authentication.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'statup-angular';
  constructor(private authenticationService: AuthenticationService) {}

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  logOut() {
    this.authenticationService.logOut();
  }
}
