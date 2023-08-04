import { Injectable } from '@angular/core';
import { HttpService } from '../service/http.service';
import { HttpParams } from '@angular/common/http';
import { Param } from '../type/params';
import { CONSTANT } from '../constants';
import { CategoryListResponse, Quiz } from '../type/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private httpService: HttpService) {}
  data: { list: Quiz[] } = { list: [] };
  getCategoryList(params: { success: Function; error: Function }): void {
    this.httpService.httpRequestCall({
      method: 'GET',
      url: CONSTANT.API.GET_CATEGORY_LIST,
      success: params.success,
      error: params.error,
    });
  }

  getQuizList(params: {
    categoryId: string;
    difficulty: string;
    success: Function;
    error: Function;
  }): void {
    this.httpService.httpRequestCall({
      method: 'GET',
      url: CONSTANT.API.GET_QUIZ_LIST.replace(
        '${categoryId}',
        params.categoryId
      ).replace('${difficulty}', params.difficulty),
      success: params.success,
      error: params.error,
    });
  }

  setData(data: { list: Quiz[] }) {
    this.data = data;
  }

  getData(): { list: Quiz[] } {
    return this.data;
  }
}