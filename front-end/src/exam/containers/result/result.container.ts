import { Component, Inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

import { CommonContainer } from '../../utils/common-container';
import { State, MODULE_STORE_TOKEN } from '../../logic/state/state';
import { AsyncDataSer } from '../../../utils/asyncData';

@Component({
    selector: 'exm-result',
    templateUrl: './result.container.html',
    styleUrls: ['./result.container.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultContainer  extends CommonContainer
{
    public resultScore: AsyncDataSer<number> = null;

    constructor(
        @Inject(MODULE_STORE_TOKEN)
        protected override store$: Store<State>,
        protected override changeDetectorRef: ChangeDetectorRef,
    )
    {
        super(store$, changeDetectorRef);

        this.store$
            .select(state => state.exam)
            .pipe(takeUntil(this.componentDestroyed$))
            .subscribe({
                next:
                    (exam) =>
                    {
                        this.resultScore = exam.resultScore;
                        this.changeDetectorRef.markForCheck();
                    },
                error: (e) => { throw e; } });
    }
}
