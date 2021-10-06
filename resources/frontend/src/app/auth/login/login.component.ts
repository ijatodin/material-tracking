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
  errorMessage: string = null;

  constructor(
    private authSvc: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm);
    this.authSvc.login(this.loginForm.email, this.loginForm.password).pipe(first()).subscribe((data) => {
      console.log(data);
      this.router.navigate(["/receiving"]);
    },() => {
      this.errorMessage = 'The provided credentials are incorrect.';
    });
  }

}
