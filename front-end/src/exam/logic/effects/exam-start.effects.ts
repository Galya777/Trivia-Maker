import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, concat } from 'rxjs';
import { filter, mergeMap, withLatestFrom, takeUntil, takeLast, skip, map } from 'rxjs/operators';
import { NavigationGoAction } from 'router-store-ser';

import { ExamStatusAction, ExamEndAction, ExamTimeAction, ExamStartAction } from '../actions/exam.actions';
import { ExamStatus, State as ExamState } from '../state/exam.state';
import { ExamTimerService } from '../../data/exam-timer.service';
import { QuestionsFetchService } from '../../data/questions-fetch.service';
import { AsyncDataSer } from '../../../utils/asyncData';
import { startRouteId, questionRouteId } from '../../exam-routing.module';
import { QuestionsDataAction, QuestionsCurrentAction } from '../actions/questions.actions';
import { State, MODULE_STORE_TOKEN } from '../state/state';

/**
 * Business logic implementation:
 * - EXAM_START()
 *   - If (state.exam.status==READY):
 *     - Fetch questions data
 *       - \>QUESTIONS_DATA(),
 *       - \>QUESTIONS_CURRENT(initial)
 *     - \>EXAM_STATUS(RUNNING)
 *     - \>NAVIGATION_GO(EXAM_QUESTION, 1)
 *     - Start timed exam for state.exam.duration
 *     - Two seconds interval, while state.exam.status==RUNNING:
 *       - Fetch exam expiration
 *       - If expired:
 *         - \>EXAM_END(TIME_ENDED)
 *         - \>NAVIGATION_GO(EXAM_RESULT)
 *       - If !expired:
 *         - \>EXAM_TIME(timeLeft)
 */
@Injectable()
export class ExamStartEffects
{
    public effect$ = createEffect(() => {
        const instance: ExamStartEffects = this;
        const exam$: Store<ExamState> = this.store$.select(state => state.exam);

        return this.actions$.pipe(
            ofType(ExamStartAction.type),
            withLatestFrom(exam$, testReady),
            filter(exam => exam != null && AsyncDataSer.hasData(exam.data, false)),
            mergeMap((state: ExamState) => {
                return concat(
                    questionsFetchService.fetchQuestions(state.data.data).pipe(
                        map(questions => new QuestionsDataAction({ data: questions }))
                    ),
                    of(new QuestionsCurrentAction({ num: 1 })),
                    produceTimer(state),
                );
            })
        );

        function testReady(action: Action, exam: ExamState) {
            if (AsyncDataSer.hasData(exam.data, false) && exam.status === ExamStatus.READY)
                return exam;
            return null;
        }

        function produceTimer(state: ExamState) {
            const running$ = of(
                new ExamStatusAction({ status: ExamStatus.RUNNING }),
                new NavigationGoAction({
                    commands: ['../question/1'],
                    relativeRouteId: startRouteId,
                }),
            );

            const timer$ = instance.examTimerService.getTimer(state.data.data.duration).pipe(
                takeUntil(exam$.pipe(filter(s => s.status !== ExamStatus.RUNNING))),
                map(num => new ExamTimeAction({ time: num }))
            );

            const end$ = exam$.pipe( // this works because concat() only subscribes end$ after timer$ completes
                take(1),
                filter(s => s.status === ExamStatus.RUNNING), // timer ended to the end without interruption
                mergeMap(_ => of(
                    new ExamEndAction({ status: ExamStatus.TIME_ENDED }),
                    new NavigationGoAction({
                        commands: ['../../result'],
                        relativeRouteId: questionRouteId,
                    })
                ))
            );

            return concat(running$, timer$, end$);
        }
    });

    constructor(
        protected actions$: Actions,
        @Inject(MODULE_STORE_TOKEN)
        protected store$: Store<State>,
        protected examTimerService: ExamTimerService,
        protected questionsFetchService: QuestionsFetchService,
    ) {}
}
