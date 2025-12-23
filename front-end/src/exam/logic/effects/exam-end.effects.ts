import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Observable, concat, of } from 'rxjs';
import { mergeMap, take, map, filter } from 'rxjs/operators';

import { ExamStatusAction, ExamEndAction, ExamScoreAction } from '../actions/exam.actions';
import { ExamEvalService } from '../../data/exam-eval.service';
import { State, MODULE_STORE_TOKEN } from '../state/state';
import { AsyncDataSer } from '../../../utils/asyncData';

/**
 * Business logic implementation:
 * - EXAM_END(status)
 *   - \>EXAM_STATUS(status)
 *   - \>EXAM_SCORE(null)
 *   - Submit answers to service
 *     - \>EXAM_SCORE(score)
 */
@Injectable()
export class ExamEndEffects
{
    public effect$ = createEffect(() => this.actions$.pipe(
        ofType<ExamEndAction>(ExamEndAction.type),
        mergeMap(
            action => concat(
                of(new ExamStatusAction({ status: action.payload.status })),
                this.store$.pipe(
                    take(1),
                    map(getExamData),
                    filter((a: any) => a !== null),
                    mergeMap(
                        ({ examInfo, questions }: { examInfo: any, questions: any }) =>
                        {
                            return concat(
                                of(new ExamScoreAction({ score: AsyncDataSer.loading<number>() })),
                                this.examEvalService.evalQuestions(examInfo, questions).pipe(
                                    map((adata: any) => new ExamScoreAction({ score: adata }))
                                ),
                            );
                        }),
                ),
            )),
    ));

    constructor(
        private actions$: Actions,
        @Inject(MODULE_STORE_TOKEN)
        private store$: Store<State>,
        private examEvalService: ExamEvalService,
    ) {}
}

function getExamData(storeState: State)
{
    if (!storeState.exam || !AsyncDataSer.hasData(storeState.exam.data, false)
        || !storeState.questions || !AsyncDataSer.hasData(storeState.questions.data, false))
        return null;

    return {
        examInfo: storeState.exam.data.data,
        questions: storeState.questions.data.data,
    };
}
