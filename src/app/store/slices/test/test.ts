import * as defaultState from './index.json';

export const TEST_UPDATE_TITLE = '[test] update test';

console.log('default state', defaultState);

const types = {
  TEST_UPDATE_TITLE,
};
export const testActions = {
  updateTest: (payload: any) => {
    return { type: TEST_UPDATE_TITLE, payload };
  },
  types,
};

export function TestReducer(state: any = defaultState, action: any) {
  switch (action.type) {
    case TEST_UPDATE_TITLE:
      return { ...state, ...{ test: action.payload.test }, ...{ type: action.type } };
    default:
      return { ...state };
  }
}
