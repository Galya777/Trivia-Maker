import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, take, startWith } from 'rxjs/operators';

@Injectable()
export class ExamTimerService
{
    /**
     * Returns a timer for clocking an exam. The timer is an observable of a countdown of seconds, that completes at the end.
     * @param duration The number of seconds for the countdown.
     */
    public getTimer(duration: number): Observable<number>
    {
        return interval(1000).pipe(map((i: any) => duration - i - 1), take(duration), startWith(duration));
    }
}
