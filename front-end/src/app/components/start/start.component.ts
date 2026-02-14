import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class StartComponent implements OnInit {
  testForm: FormGroup;
  isLoggedIn = false;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router
  ) {
    this.testForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      duration: [10, [Validators.required, Validators.min(1)]],
      isPublic: [true],
      questions: this.fb.array([])
    });
  }

  ngOnInit() {
    // Check if user is logged in
    const token = localStorage.getItem('Authorization');
    this.isLoggedIn = !!token;
    
    // Add first question if empty
    if (this.questions.length === 0) {
      this.addQuestion();
    }
  }

  get questions(): FormArray {
    return this.testForm.get('questions') as FormArray;
  }

  getAnswersControls(questionIndex: number): any[] {
    return (this.questions.at(questionIndex).get('answers') as FormArray).controls;
  }

  addQuestion() {
    const questionGroup = this.fb.group({
      text: ['', Validators.required],
      answers: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      correctIndex: [0, Validators.required]
    });
    this.questions.push(questionGroup);
  }

  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    }
  }

  onSubmit() {
    if (this.testForm.invalid) {
      this.errorMessage = 'Моля, попълнете всички задължителни полета';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.testForm.value;
    
    // Transform questions to the format expected by backend
    const testData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      duration: formData.duration,
      isPublic: formData.isPublic,
      questions: formData.questions.map((q: any) => ({
        text: q.text,
        answers: q.answers,
        correctAnswer: q.answers[q.correctIndex]
      }))
    };

    this.httpService.createTest(testData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.successMessage = 'Тестът е създаден успешно!';
        this.testForm.reset();
        this.questions.clear();
        this.addQuestion();
        // Navigate to tests page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/tests']);
        }, 2000);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Грешка при създаване на теста. Моля, опитайте отново.';
        console.error(err);
      }
    });
  }
}
