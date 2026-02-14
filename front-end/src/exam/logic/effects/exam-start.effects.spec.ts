import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StoreModule, Store, Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold } from 'jasmine-marbles';
import { Observable, of, concat, interval } from 'rxjs';
import { map, take, startWith, catchError, tap, delay } from 'rxjs/operators';
import { NavigationGoAction } from 'router-store-ser';
import { matchObservable } from 'match-observable';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducersMap } from '../logic.module';
import { ExamStartEffects } from './exam-start.effects';
import { ExamStatus, initialState as examInitialState } from '../state/exam.state';
import { ExamStatusAction, ExamStartAction, ExamEndAction, ExamTimeAction } from '../actions/exam.actions';
import { ExamTimerService } from '../../data/exam-timer.service';
import { AsyncDataSer } from '../../../utils/asyncData';
import { ExamInfo } from '../../models/exam-info';
import { questionRouteId, startRouteId } from '../../exam-routing.module';
import { deepEqual } from '../../utils/deep-equal';
import { failOnObsError } from '../../utils/jasmine-fail-observer';
import { QuestionsDataAction, QuestionsCurrentAction } from '../actions/questions.actions';
import { QuestionsFetchService } from '../../data/questions-fetch.service';
import { Question } from '../../models/question';
import { createExam } from '../../utils/exam-samples';
import { State, MODULE_STORE_TOKEN } from '../state/state';

describe('Exam/Logic/' + ExamStartEffects.name, () =>
{
    let effects: ExamStartEffects;
    let actions: Observable<any>;
    let store$: Store<State>;
    let examTimerService: jasmine.SpyObj<ExamTimerService>;
    let questionsFetchService: jasmine.SpyObj<QuestionsFetchService>;
    const examDuration = 5; // seconds, expected observable below has this hardcoded
    const { exam, questions } = createExam('1');

    it('should not emit actions when exam.status != READY ', () =>
    {
        init({ exam: { ...examInitialState, status: ExamStatus.OFF }, questions: null });
        actions = hot('a', { a: new ExamStartAction() });
        const expected = cold('', {});

        expect(effects.effect$.pipe(catchError(failOnObsError))).toBeObservable(expected);
    });

    it('should emit timer actions until expired', () => fakeAsync(() =>
    {
        initExam(examDuration);
        examTimerService.getTimer.and.returnValue(getTimerMock(examDuration));
        questionsFetchService.fetchQuestions.and.returnValue(fetchQuestionsMock(questions));

        actions = of(new ExamStartAction());
        let matchResult: string | null = null;
        matchObservable<Action>(
            effects.effect$.pipe(
                catchError(failOnObsError),
                tap(a => store$.dispatch(a))
            ),
            buildExpected(examDuration),
            true,
            false,
            deepEqual,
        ).then(() => matchResult = null, result => matchResult = result);

        tick(examDuration * 1000 + 4000);
        tick(1000);
        expect(matchResult).toBeNull();
    })());

    it('should interrupt timer if exam ends', () => fakeAsync(() =>
    {
        initExam(examDuration);
        examTimerService.getTimer.and.returnValue(getTimerMock(examDuration));
        questionsFetchService.fetchQuestions.and.returnValue(fetchQuestionsMock(questions));

        actions = concat(
            of(new ExamStartAction()),
            interval(2.5 * 1000).pipe(take(1), map(() => new ExamStatusAction({ status: ExamStatus.ENDED }))),
        );
        let matchResult: string | null = null;
        matchObservable<Action>(
            effects.effect$.pipe(
                catchError(failOnObsError),
                tap(a => store$.dispatch(a))
            ),
            buildExpected(examDuration, examDuration - 2),
            true,
            false,
            deepEqual,
        ).then(() => matchResult = null, result => matchResult = result);

        tick(examDuration * 1000 + 1000);
        expect(matchResult).toBeNull();
    })());

    function init(initialState: State)
    {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot<State, Action>(
                    reducersMap,
                    initialState ? { initialState } : {}),
                StoreDevtoolsModule.instrument({
                    maxAge: 50, //  Retain last n states
                }),
            ],
            providers: [
                ExamStartEffects,
                provideMockActions(() => actions.pipe(tap(a => store$.dispatch(a)))),
                { provide: MODULE_STORE_TOKEN, useExisting: Store },
                {
                    provide: ExamTimerService,
                    useValue: jasmine.createSpyObj('ExamTimerService', { getTimer: getTimerMock }),
                },
                {
                    provide: QuestionsFetchService,
                    useValue: jasmine.createSpyObj('QuestionsFetchService', { fetchQuestions: fetchQuestionsMock }),
                },
            ],
        });

        effects = TestBed.inject(ExamStartEffects);
        store$ = TestBed.inject(Store);
        examTimerService = TestBed.inject(ExamTimerService) as jasmine.SpyObj<ExamTimerService>;
        questionsFetchService = TestBed.inject(QuestionsFetchService) as jasmine.SpyObj<QuestionsFetchService>;
    }

    /**
     *
     * @param duration Duration in the preset exam data
     */
    function initExam(duration: number)
    {
        init({
            exam: {
                ...examInitialState,
                status: ExamStatus.READY,
                data: new AsyncDataSer({
                    ...exam,
                    duration, // seconds
                } as ExamInfo, false),
            },
            questions: null,
        });
    }

    function buildExpected(timerStart: number, timerEnd: number = 0)
    {
        let start = timerStart;
        const expected: Action[] = [
            new QuestionsDataAction({ data: new AsyncDataSer<Question[]>(questions) }),
            new QuestionsCurrentAction({ num: 1 }),
            new ExamStatusAction({ status: ExamStatus.RUNNING }),
            new NavigationGoAction({
                commands: ['../question/1'],
                relativeRouteId: startRouteId,
            }),
        ];
        for (; start >= timerEnd; --start)
            expected.push(new ExamTimeAction({ time: start }));

        if (timerEnd === 0)
        {
            expected.push(new ExamEndAction({ status: ExamStatus.TIME_ENDED }));
            expected.push(new NavigationGoAction({
                commands: ['../../result'],
                relativeRouteId: questionRouteId,
            }));
        }

        return expected;
    }
});

/**
 * Returns a timer for clocking an exam. The timer is an observable of a countdown of seconds, that completes at the end.
 * @param duration The number of seconds for the countdown.
 */
function getTimerMock(duration: number)
{
    return interval(1000).pipe(
        map(i => duration - i - 1),
        take(duration),
        startWith(duration)
    );
}

function fetchQuestionsMock(questions: Question[]): Observable<AsyncDataSer<Question[]>>
{
    return of(new AsyncDataSer<Question[]>(questions));
}
