import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction, RouterStateSerializer } from '@ngrx/router-store';
import { Observable } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

import { ExamEndAction } from '../actions/exam.actions';
import { ExamStatus, State as ExamState } from '../state/exam.state';
import { resultRouteId } from '../../exam-routing.module';
import { RouterStateSerializer as CustomRouterStateSerializer, RouterStateSer } from 'router-store-ser';
import { State, MODULE_STORE_TOKEN } from '../state/state';

/**
 * Business logic implementation:
 * - ROUTER_NAVIGATION(EXAM_RESULT)
 *   - \>EXAM_END(ENDED), if needed (state.exam.status!=ENDED && !=TIME_ENDED)
 */
@Injectable()
export class RouterResultEffects
{
    public effect$ = createEffect(() => {
        const exam$: Store<ExamState> = this.store$.select(state => state.exam);

        return this.actions$.pipe(
            ofType<RouterNavigationAction<RouterStateSer>>(ROUTER_NAVIGATION),
            withLatestFrom(exam$),
            map(([action, exam]) => {
                const node = this.routerStateSerializer.findNodeById(action.payload.routerState.root, resultRouteId);
                if (node && exam.status !== ExamStatus.ENDED && exam.status !== ExamStatus.TIME_ENDED) {
                    return action;
                }
                return null;
            }),
            filter(action => action != null),
            map(action => new ExamEndAction({ status: ExamStatus.ENDED }))
        );
    });

    constructor(
        private actions$: Actions,
        @Inject(MODULE_STORE_TOKEN)
        private store$: Store<State>,
        @Inject(RouterStateSerializer)
        private routerStateSerializer: CustomRouterStateSerializer,
    ) {}
}
