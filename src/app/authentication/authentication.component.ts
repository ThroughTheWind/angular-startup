import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.less']
})
export class AuthenticationComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

}
