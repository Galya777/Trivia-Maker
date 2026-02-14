import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.components.html',
  styleUrls: ['./register.components.css'],
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule]
})
export class RegisterComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly http: HttpService
  ) {}

  ngOnInit(): void {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
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