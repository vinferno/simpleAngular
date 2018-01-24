import {testActions, TestReducer} from './slices/test/test';

export const reducers = {
  test: TestReducer,
};

export const stateActions = {
  test: testActions,
};
