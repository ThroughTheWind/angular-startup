import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Startup-NgBlog';
  constructor(private authenticationService: AuthenticationService) {}

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  logOut() {
    this.authenticationService.logOut();
  }
}
