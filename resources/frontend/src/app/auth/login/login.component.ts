import { Component, OnInit } from '@angular/core';
// import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formData: any = {};

  constructor(
    // private authSvc: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.formData);
  }

}
