import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RouterStateSerializer } from '@ngrx/router-store';
import { EMPTY, Observable } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { tassign2 } from './tassign2';

import { ACTION_NAVIGATION_GO, NavigationGoAction } from './navigation.actions';
import { RouterStateSerializer as CustomRouterStateSerializer } from './router-state-serializer';

/**
 * Implements the navigation command action as a side effect.
 */
@Injectable()
export class NavigationEffects
{
    navigate$ = createEffect(() => this.actions$.pipe(
        ofType<NavigationGoAction>(ACTION_NAVIGATION_GO),
        mergeMap(action =>
        {
            let route: ActivatedRoute = null;
            if (action.payload.relativeRouteId)
            {
                route = this.routerStateSerializer.findRouteById(this.router.routerState.root, action.payload.relativeRouteId);
                if (route)
                    this.router.navigate(
                        action.payload.commands,
                        tassign2(action.payload.extras, { relativeTo: route }));
                else
                    throw new Error('RouterStoreSerModule. NavigationEffects. Action: "' + ACTION_NAVIGATION_GO
                        + '" specified a route id which was not found on current activated route.');
            }
            else
            this.router.navigate(
                action.payload.commands,
                tassign2(action.payload.extras, { relativeTo: null }));

            return EMPTY;
        })
    ), { dispatch: false });

    constructor(
        protected actions$: Actions,
        protected router: Router,
        @Inject(RouterStateSerializer)
        protected routerStateSerializer: CustomRouterStateSerializer,
    ) { }
}
