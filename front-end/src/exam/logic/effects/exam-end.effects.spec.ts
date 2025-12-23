import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { StoreModule, Action, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { matchObservable } from 'match-observable';

import { ExamEndEffects } from './exam-end.effects';
import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamEvalService } from '../../data/exam-eval.service';
import { reducersMap } from '../logic.module';
import { State, MODULE_STORE_TOKEN } from '../state/state';
import { ExamStatus } from '../state/exam.state';
import { ExamStatusAction, ExamEndAction, ExamScoreAction } from '../actions/exam.actions';
import { ExamInfo } from '../../models/exam-info';
import { Question } from '../../models/question';
import { createExam } from '../../utils/exam-samples';
import { deepEqual } from '../../utils/deep-equal';
import { failOnObsError } from '../../utils/jasmine-fail-observer';

describe('Exam/Logic/' + ExamEndEffects.name, () =>
{
    let store$: Store<State>;
    let actions: Observable<any>;
    let effects: ExamEndEffects;
    let examEvalServiceSpy: jasmine.SpyObj<ExamEvalService>;

    function init(initialState: State)
    {
        const serviceSpy = jasmine.createSpyObj<ExamEvalService>(
            'ExamEvalService',
            {
                evalQuestions: of(new AsyncDataSer<number>(0)),
            });

        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot<State, Action>(
                    reducersMap,
                    initialState ? { initialState } : {}),
            ],
            providers: [
                ExamEndEffects,
                provideMockActions(() => actions.pipe(tap(a => store$.dispatch(a)))),
                { provide: MODULE_STORE_TOKEN, useExisting: Store },
                { provide: ExamEvalService, useValue: serviceSpy },
            ],
        });

        effects = TestBed.inject(ExamEndEffects);
        store$ = TestBed.inject(Store);
        examEvalServiceSpy = serviceSpy;
    }

    it('should emit the correct actions.', () => fakeAsync(() =>
    {
        const { exam, questions } = createExam('1');

        init({
            exam: {
                data: new AsyncDataSer<ExamInfo>(exam, false),
                resultScore: new AsyncDataSer<number>(0),
                timeLeft: 0, // seconds
                status: ExamStatus.ENDED,
            },
            questions: {
                current: 0,
                data: new AsyncDataSer<Question[]>(questions, false),
            },
        });

        actions = of(new ExamEndAction({ status: ExamStatus.ENDED }));
        const score = new AsyncDataSer<number>(0);
        const expected =  [
            new ExamStatusAction({ status: ExamStatus.ENDED }),
            new ExamScoreAction({ score: AsyncDataSer.loading<number>() }),
            new ExamScoreAction({ score }),
        ];
        let matchResult: string | null = null;
        matchObservable<Action>(effects.effect$.pipe(catchError(failOnObsError)), expected, true, false, deepEqual)
            .then(() => matchResult = null, (result: any) => matchResult = result);
        flush();
        expect(matchResult).toBeNull();

        expect(examEvalServiceSpy.evalQuestions).toHaveBeenCalledWith(exam, questions);
    })());

});
