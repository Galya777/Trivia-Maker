import { Component, OnInit } from '@angular/core';
import { CONSTANT } from '../constants';
import { QuizService } from './quiz_service';
import { Param } from '../type/params';
import { Helper } from '../utility/helper';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CategoryListResponse,
  QuizeListResponse,
  Option,
  Quiz,
} from '../type/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz_components.html',
  styleUrls: ['./quiz_components.scss'],
})
export class QuizComponent implements OnInit {
  constructor(
    private quizeService: QuizService,
    private helper: Helper,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  QUIZ = CONSTANT.QUIZ;
  selectedCategory: string = '';
  selectedDifficulty: string = '';
  CATEGORY_OPTIONS: Option[] = [];
  DIFFICULTY_OPTIONS: Option[] = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ];
  quizList: Quiz[] = [];
  userAnsArr: string[] = [];
  showSubmit: boolean = false;
  loading: boolean = false;

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList(): void {
    this.quizeService.getCategoryList({
      success: (data: CategoryListResponse) => {
        this.CATEGORY_OPTIONS = data.trivia_categories;
      },
      error: () => {},
    });
  }

  getQuizList(): void {
    this.loading = true;
    this.quizList = [];
    this.quizeService.getQuizList({
      categoryId: this.selectedCategory,
      difficulty: this.selectedDifficulty,
      success: (data: QuizeListResponse) => {
        this.quizList = data.results.map((res: Quiz) => {
          res.all_answers = res.incorrect_answers.concat(res.correct_answer);
          this.helper.shuffleArray(res.all_answers);
          return res;
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  onCreate(): void {
    this.getQuizList();
  }

  onAnswerSelect(ans: string, index: number): void {
    this.userAnsArr[index] = ans;
    this.quizList[index].userAnswer = ans;
    let totalAns = this.userAnsArr.filter((el: string) => el).length;
    if (totalAns === 5) {
      this.showSubmit = true;
    } else {
      this.showSubmit = false;
    }
  }

  onSubmit(): void {
    this.quizeService.setData({ list: this.quizList });
    this.router.navigate(['result'], { relativeTo: this.route });
  }
}