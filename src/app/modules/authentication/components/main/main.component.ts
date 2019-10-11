import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

}
