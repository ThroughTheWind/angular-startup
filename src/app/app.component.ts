import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { Component } from '@angular/core';
import { Image } from './shared/models/Image';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Startup/NgMdFirebaseBlog';
  constructor(private authenticationService: AuthenticationService) {}

  images = [{
    title: 'Test title',
    description: 'Test description',
    url: 'https://firebasestorage.googleapis.com/v0/b/startupangular.appspot.com/o/files%2F1568196913009_wp2.jpg?alt=media&token=40084a0f-5cf2-41be-9b18-4183d7faf71e'
  },{
    title: 'See those heroes ?',
    description: 'See those heroes ?',
    url: 'https://firebasestorage.googleapis.com/v0/b/startupangular.appspot.com/o/files%2F1569245106016_633-17-202P-Black.jpg?alt=media&token=5b6449fa-9cd9-4ccf-84de-f5ffe675e601'
  },{
    title: 'BAD URL BITCH',
    description: 'See those heroes ?',
    url: 'https://firebasestorage.googleapis.com/v0/b/startupangular.appspot.com/o/files%2F1569245106016_633-1'
  }] as Image[];
  
  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  logOut() {
    this.authenticationService.logOut();
  }
}
