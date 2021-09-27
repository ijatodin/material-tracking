import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any = {};

  constructor(
    private authSvc: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm);
    this.authSvc.login(this.loginForm.email, this.loginForm.password).pipe(first()).subscribe((data) => {
      this.router.navigate(["/receiving"]);
    })
  }

}
