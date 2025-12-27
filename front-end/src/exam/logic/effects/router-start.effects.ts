import { Inject, Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterNavigationAction, RouterStateSerializer } from '@ngrx/router-store';
import { of, concat } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

import { ExamStatusAction, ExamDataAction } from '../actions/exam.actions';
import { startRouteId } from '../../exam-routing.module';
import { ROUTER_ACTIVE } from '../../../utils/router-state-extension';
import { RouterStateSerializer as CustomRouterStateSerializer, RouterStateSer } from 'router-store-ser';
import { ExamStatus } from '../state/exam.state';
import { ExamFetchService } from '../../data/exam-fetch.service';
import { AsyncDataSer } from '../../../utils/asyncData';
import { QuestionsDataAction } from '../actions/questions.actions';

/**
 * Business logic implementation:
 * - ROUTER_NAVIGATION(EXAM_START)
 *   - \>EXAM_STATUS(OFF)
 *   - Fetch exam data, then:
 *     - \>EXAM_DATA()
 *     - \>QUESTIONS_DATA(empty)
 *     - \>EXAM_STATUS(READY)
 */
@Injectable()
export class RouterStartEffects
{
    public effect$ = createEffect(() =>
        this.actions$.pipe(
            ofType<RouterNavigationAction<RouterStateSer>>(ROUTER_ACTIVE),
            filter(action => !!this.routerStateSerializer.findNodeById(action.payload.routerState.root, startRouteId)),
            mergeMap((action) =>
                concat(
                    of(new ExamStatusAction({ status: ExamStatus.OFF })),
                    this.examFetchService.fetchExam().pipe(
                        filter(adata => AsyncDataSer.hasData(adata, true)),
                        mergeMap((adata) =>
                            of(
                                new ExamDataAction({ data: adata }),
                                new QuestionsDataAction({ data: null }),
                                new ExamStatusAction({ status: ExamStatus.READY })
                            )
                        )
                    )
                )
            )
        )
    );

    constructor(
        protected actions$: Actions,
        @Inject(RouterStateSerializer)
        protected routerStateSerializer: CustomRouterStateSerializer,
        protected examFetchService: ExamFetchService,
    ) {}
}
