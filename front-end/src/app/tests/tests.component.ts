import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css'
})
export class TestsComponent implements OnInit {
  tests: any[] = [];

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit() {
    this.loadTests();
  }

  loadTests() {
    this.httpService.getTests().subscribe({
      next: (data) => {
        this.tests = data;
      },
      error: (err) => {
        console.error('Error loading tests', err);
      }
    });
  }

  takeTest(testId: string) {
    this.router.navigate(['/exam'], { queryParams: { testId } });
  }

  createTest() {
    // Navigate to create test page or open modal
    this.router.navigate(['/start']);
  }

  editTest(testId: string) {
    // Implement edit
  }

  deleteTest(testId: string) {
    this.httpService.deleteTest(testId).subscribe({
      next: () => {
        this.loadTests();
      },
      error: (err) => {
        console.error('Error deleting test', err);
      }
    });
  }
}
