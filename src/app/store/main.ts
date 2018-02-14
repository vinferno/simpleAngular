import { testReducer, testActions } from './slices/test/test';
import { loveReducer, loveActions } from './slices/love/love';

export const reducers = {
	test: testReducer,
	love: loveReducer,

};

export const stateActions = {
	test: testActions,
	love: loveActions,

};
