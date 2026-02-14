import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:3000';

  httpOptions = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
    },
  };

  // Method to login in the application
  login(data: any) {
    return this.http.post<any>(`${this.apiUrl}/api/login`, data);
  }

  // Method to register in the application
  register(data: any) {
    return this.http.post<any>(`${this.apiUrl}/api/users`, data);
  }

  // Method to get the user profile
  profile(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/api/users/profile`,
      this.httpOptions
    );
  }

  // Method to get all tests
  getTests(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/tests`, this.httpOptions);
  }

  // Method to get test by id
  getTest(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/tests/${id}`, this.httpOptions);
  }

  // Method to get tests by user id
  getTestsByUserId(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users/${userId}/tests`, this.httpOptions);
  }

  // Method to create test
  createTest(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/tests`,
      data,
      this.httpOptions
    );
  }

  // Method to update test
  updateTest(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/api/tests/${id}`,
      data,
      this.httpOptions
    );
  }

  // Method to delete test
  deleteTest(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/api/tests/${id}`,
      this.httpOptions
    );
  }

  // Method to get test results
  getTestResults(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/tests/${id}/results`, this.httpOptions);
  }

  // Method to submit test result
  submitResult(id: string, data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/tests/${id}/results`,
      data,
      this.httpOptions
    );
  }

  // Get global leaderboard
  getLeaderboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/tests/leaderboard/global`, this.httpOptions);
  }

  // Get user statistics
  getUserStats(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/tests/stats/${userId}`, this.httpOptions);
  }

  // Competitions
  getCompetitions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/competitions`, this.httpOptions);
  }

  createCompetition(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/competitions`,
      data,
      this.httpOptions
    );
  }

  joinCompetition(id: string, token: string): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/competitions/${id}/join`,
      { token },
      this.httpOptions
    );
  }

  // Users (for admin)
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users`, this.httpOptions);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/api/users/${id}`,
      data,
      this.httpOptions
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/api/users/${id}`,
      this.httpOptions
    );
  }
}
