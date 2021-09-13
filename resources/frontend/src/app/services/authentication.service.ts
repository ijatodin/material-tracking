import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from '../model/user';


interface GenericResponse {
  model:Array<any>
}


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    options: any;

    constructor(private http: HttpClient) {

      this.options = {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        })
      };

        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('matTracker')));
        // this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/auth/login`, { grant_type: 'password',
            // client_id: '2',
            // client_secret: environment.apiKey,
            username: username,
            password: password,
            scope: ''
          }, this.options )
            .pipe(map(user => {
               let tempUser:any = user
                // store user details and sanctum token in local storage to keep user logged in between page refreshes
                if(tempUser !== null) {
                  localStorage.setItem('matTracker', JSON.stringify(user));
                  this.currentUserSubject.next(tempUser);
                  return user;
                } else {
                  console.log(this.currentUserSubject.error)
                }
            }));
    }

    logout() {
        localStorage.removeItem('matTracker');
        this.options.headers.Authorization = 'Bearer ' + this.currentUserSubject.value.token;
        return this.http.get(`${environment.apiUrl}/auth/logout`, this.options).subscribe(() => {
          this.currentUserSubject.next(null);
        });
    }


}
