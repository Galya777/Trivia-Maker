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
    return this.http.post<any>(`${environment.production}/api/login`, data);
  }

  // Method to register in the application
  register(data: any) {
    return this.http.post<any>(`${environment.production}/api/users`, data);
  }

  // Method to get the user profile
  profile(): Observable<any> {
    return this.http.get<any>(
      `${environment.production}/api/users/profile`,
      this.httpOptions
    );
  }

  // Method to get all tests
  getTests(): Observable<any> {
    return this.http.get<any>(`${environment.production}/api/tests`, this.httpOptions);
  }

  // Method to get test by id
  getTest(id: string): Observable<any> {
    return this.http.get<any>(`${environment.production}/api/tests/${id}`, this.httpOptions);
  }

  // Method to create test
  createTest(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.production}/api/tests`,
      data,
      this.httpOptions
    );
  }

  // Method to update test
  updateTest(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `${environment.production}/api/tests/${id}`,
      data,
      this.httpOptions
    );
  }

  // Method to delete test
  deleteTest(id: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.production}/api/tests/${id}`,
      this.httpOptions
    );
  }

  // Method to get test results
  getTestResults(id: string): Observable<any> {
    return this.http.get<any>(`${environment.production}/api/tests/${id}/results`, this.httpOptions);
  }

  // Method to submit test result
  submitResult(id: string, data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.production}/api/tests/${id}/results`,
      data,
      this.httpOptions
    );
  }

  // Competitions
  getCompetitions(): Observable<any> {
    return this.http.get<any>(`${environment.production}/api/competitions`, this.httpOptions);
  }

  createCompetition(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.production}/api/competitions`,
      data,
      this.httpOptions
    );
  }

  joinCompetition(id: string, token: string): Observable<any> {
    return this.http.post<any>(
      `${environment.production}/api/competitions/${id}/join`,
      { token },
      this.httpOptions
    );
  }

  // Users (for admin)
  getUsers(): Observable<any> {
    return this.http.get<any>(`${environment.production}/api/users`, this.httpOptions);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `${environment.production}/api/users/${id}`,
      data,
      this.httpOptions
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.production}/api/users/${id}`,
      this.httpOptions
    );
  }
}
