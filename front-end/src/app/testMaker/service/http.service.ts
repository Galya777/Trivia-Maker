import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Param } from '../type/params';
import { Observable } from 'rxjs';
import { CategoryListResponse, QuizeListResponse } from '../type/quiz';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private httpReqHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return headers;
  }

  private httpReqObj(): { headers: HttpHeaders } {
    return {
      headers: this.httpReqHeaders(),
    };
  }

  httpRequestCall(params: Param): void {
    this.http
      .request<CategoryListResponse | QuizeListResponse>(
        params.method,
        params.url,
        this.httpReqObj()
      )
      .subscribe((data: CategoryListResponse | QuizeListResponse) => {
        params.success(data);
      });
  }
}