import { Injectable } from '@angular/core';
import { Observable, concat, of, interval } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AsyncDataSer } from '../../utils/asyncData';
import { createExam } from '../utils/exam-samples';
import { ExamInfo } from '../models/exam-info';

@Injectable()
export class ExamFetchService
{
    public fetchExam(): Observable<AsyncDataSer<ExamInfo>>
    {
        const { exam } = createExam('1');
        return concat(
            of(AsyncDataSer.loading<ExamInfo>()),
            // can't use a simple .delay(500) because it is not compatible with fakeAsync() in the testing.
            interval(500).pipe(take(1), map(_ => new AsyncDataSer<ExamInfo>(exam, false))),
        );
    }
}
