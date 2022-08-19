import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
    },
  };

  // Method to login in the application
  login(data: any) {
    return this.http.post<any>(`${environment.production}/auth/login`, data);
  }

  // Method to register in the application
  register(data: any) {
    return this.http.post<any>(`${environment.production}/users`, data);
  }

  // Method to get the user profile 
  profile(): Observable<any> {
    return this.http.get<any>(
      `${environment.production}/users/profile`,
      this.httpOptions
    );
  }

  // Method to get all tests in Database
  getAllTests(): Observable<any> {
    return this.http.get<any>(`${environment.production}/tests`);
  }

  // Method to get all tests made by a user in Database
  getTestByUser(): Observable<any> {
    return this.http.get<any>(
      `${environment.production}/tests/by-user`,
      this.httpOptions
    );
  }
  // Method to get tests by user _id in params
  getTestsByUserId(id: string): Observable<any> {
    return this.http.get<any>(`${environment.production}/recipes/user/${id}`);
  }
  // Method to create tests in Database
  createTest(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.production}/tests`,
      data,
      this.httpOptions
    );
  }

  // Method to delete tests in Database
  deleteTests(id: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.production}/tests/${id}`,
      this.httpOptions
    );
  }
}
