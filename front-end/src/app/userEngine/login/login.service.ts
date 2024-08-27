import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient, private readonly router: Router) {}

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  error!: string;

  httpOptions = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
    },
  };

  profile() {
    return this.http
      .get<any>(`${environment.production}/users/profile`, this.httpOptions)
      .subscribe({
        next: () => this.loggedIn.next(true),
        error: () => {
          this.loggedIn.next(false);
        },
      });
  }

  // Method to login in the application
  login(data: any) {
    this.http.post<any>(`${environment.production}/user/login`, data).subscribe({
      next: (res) => {
        location.href = '/';
        this.loggedIn.next(true);
        localStorage.setItem('Authorization', res.access_token);
      },
      error: () => (this.error = 'Invalid email and/or password.'),
    });
  }

  logout() {
    localStorage.removeItem('Authorization');
    location.href = '/';
    this.loggedIn.next(false);
  }
}
