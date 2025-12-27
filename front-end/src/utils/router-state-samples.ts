import { RouterStateSer } from 'router-store-ser';
import { startRouteId } from '../exam/exam-routing.module';

/**
 * This object helps build mocked router states for testing.
 */
export const startRouterState: RouterStateSer = {
    url: '/start',
    root: {
        configPath: 'start',
        data: {
            uid: startRouteId,
        },
        children: [],
        params: {},
    },
};
