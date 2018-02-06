import {defaultState} from './index';

export const TEST_UPDATE_TITLE = '[test] update test';

console.log('default state', defaultState);

const types = {
  TEST_UPDATE_TITLE,
};
export const testActions = {
  updateTest: (payload: {test: string}) => {
    return { type: TEST_UPDATE_TITLE, payload };
  },
  types,
};

export function TestReducer(state = defaultState, action: any) {
  switch (action.type) {
    case TEST_UPDATE_TITLE:
      return { ...state, ...{ test: action.payload.test }, ...{ type: action.type } };
    default:
      return { ...state };
  }
}
