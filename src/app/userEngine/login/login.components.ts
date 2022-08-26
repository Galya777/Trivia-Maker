import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.components.html',
})
export class LoginComponent implements OnInit {
  constructor(public readonly loginService: LoginService) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get controls() {
    return this.loginForm.controls;
  }

  login(data: any) {
    return this.loginService.login(data);
  }
}