import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class SanctumInterceptor implements HttpInterceptor {
    constructor(
      private authenticationService: AuthenticationService,
      private router: Router
      ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with sanctum token if available
        let currentUser = this.authenticationService.currentUserValue;
        let isLoggedIn = currentUser && currentUser.token;
        let isApuUrl = request.url.startsWith(environment.apiUrl);

        if (isLoggedIn && isApuUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });

        }

        return next.handle(request).pipe(catchError( err => new Observable<HttpEvent<any>>(observer => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              localStorage.removeItem('matTracker');
              this.router.navigate(['/login']);
            }
          }
        })));
    }
}
