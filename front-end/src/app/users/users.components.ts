import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.components.html',
})
export class UsersComponent implements OnInit {
  constructor(
    private readonly http: HttpService,
    private readonly route: ActivatedRoute
  ) {}

  tests: any = [];
  apiURL: boolean = environment.production;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.http.getTestsByUserId(params['id']).subscribe((res) => {
        this.tests = res;
      });
    });
  }
}