import { Injectable } from '@angular/core';
import { Observable, concat, of, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AsyncDataSer } from '../../utils/asyncData';
import { createExam } from '../utils/exam-samples';
import { Question } from '../models/question';
import { ExamInfo } from '../models/exam-info';

@Injectable()
export class QuestionsFetchService
{
    public fetchQuestions(examInfo: ExamInfo): Observable<AsyncDataSer<Question[]>>
    {
        const { questions } = createExam('1');
        return concat(
            of(AsyncDataSer.loading<Question[]>()),
            // can't use a simple .delay(500) because it is not compatible with fakeAsync() in the testing.
            interval(500).pipe(take(1), map(_ => new AsyncDataSer<Question[]>(questions, false))),
        );
    }
}
