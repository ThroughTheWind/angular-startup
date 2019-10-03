import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { Component } from '@angular/core';
import { OverlayPosition } from './shared/modals/md-overlay/enums/OverlayPosition';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'Startup/NgMdFirebaseBlog';
  overlayOpened = false;
  constructor(private authenticationService: AuthenticationService) {}

  get position() { return OverlayPosition.BOTTOM; }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

  logOut() {
    this.authenticationService.logOut();
  }
  
  toggleOverlay() {
    this.overlayOpened = !this.overlayOpened;
  }
}
