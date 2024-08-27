import { Component, OnInit } from '@angular/core';
import { QUIZ } from '../constants/quiz';
import { Quiz } from '../type/quiz';
import { Router } from '@angular/router';
import { QuizService } from '../quiz/quiz_service';
@Component({
  selector: 'app-quiz-result',
  templateUrl: './result_component.html',
  styleUrls: ['./result_component.scss'],
})
export class QuizResultComponent implements OnInit {
  constructor(private quizService: QuizService, private router: Router) {}

  QUIZ = QUIZ;
  quizList: Quiz[] = [];
  correctCount: number = 0;

  ngOnInit(): void {
    let data = this.quizService.getData();
    if (data) {
      this.quizList = data.list;
      this.correctCount = this.quizList.filter(
        (q: Quiz) => q.correct_answer === q.userAnswer
      ).length;
    }
  }

  onNewQuiz(): void {
    this.quizService.setData({ list: [] });
    this.router.navigateByUrl('');
  }
}