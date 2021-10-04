import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;

  constructor(
    private authSvc: AuthenticationService
  ) {
    this.currentUser = this.authSvc.currentUserValue;
   }

  ngOnInit(): void {
  }

  isLoggedIn() {
    if (this.currentUser && this.currentUser.token) {
      return true;
    } else {
      return false;
    }
  }

}
