import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.components.html',
})
export class RegisterComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly http: HttpService
  ) {}

  ngOnInit(): void {}

  registerForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required),
  });

  get controls() {
    return this.registerForm.controls;
  }

  register(data: any): void {
    this.http.register(data).subscribe(
      (res: any) => {
        this.router.navigate(['/login']);
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}