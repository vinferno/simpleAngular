import { loveReducer, loveActions } from './slices/love/love';
import { testReducer, testActions } from './slices/test/test';

export const reducers = {
	love: loveReducer,
	test: testReducer,

};

export const stateActions = {
	love: loveActions,
	test: testActions,

};
