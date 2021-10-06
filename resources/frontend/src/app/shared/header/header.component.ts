import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;

  constructor(
    private authSvc: AuthenticationService,
    private router: Router
  ) {
    this.authSvc.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {
  }

  logOut() {
    this.authSvc.logout().add(() => {
      this.router.navigate(['/login']);
    });
  }

}
