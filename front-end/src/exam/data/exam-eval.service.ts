import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { ExamInfo } from '../models/exam-info';
import { AsyncDataSer } from '../../utils/asyncData';
import { createExam } from '../utils/exam-samples';
import { Observable, throwError, concat, of, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';

/**
 * This service takes an exam and its answers and evaluates its correctness using the server.
 * The server for now is non-existing having the caller to provide the solutions to use in the evaluation.
 */
@Injectable()
export class ExamEvalService
{
    public evalQuestions(exam: ExamInfo, questions: Question[]): Observable<AsyncDataSer<number>>
    {
        const { solutions } = createExam(exam.id);

        if (questions.length !== solutions.length)
            return throwError(new Error('ExamEvalService. Solutions provided do not match questions.'));

        const correctQuestions = questions.filter(evalAnswer);
        return concat(
            of(AsyncDataSer.loading<number>()),
            // can't use a simple .delay(500) because it is not compatible with fakeAsync() in the testing.
            interval(500).pipe(take(1), map(
                (_: any) => new AsyncDataSer<number>(truncateDecimals(correctQuestions.length / questions.length * exam.totalScore, 2)),
            )),
        );

        function evalAnswer(question: Question, idx: number): boolean
        {
            return question.answers.every(
                (answer, i) => answer.checked === (solutions[idx].indexOf(i) >= 0));
        }

        function truncateDecimals(num: number, decimals: number): number
        {
            const p = Math.pow(10.0, decimals);
            return Math.round(num * p) / p;
        }
    }
}
