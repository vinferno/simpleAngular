export interface Test {
  test: string;
}

const defaultState: Test = {
  test: 'wow',
};

export const TEST_UPDATE_TITLE = '[test] update test';

const types = {
  TEST_UPDATE_TITLE,
};
export const testActions = {
  updateTest: (payload: {test: string}) => {
    return { type: TEST_UPDATE_TITLE, payload };
  },
  types,
};

export function TestReducer(state: Test = defaultState, action: any) {
  switch (action.type) {
    case TEST_UPDATE_TITLE:
      return { ...state, ...{ test: action.payload.test }, ...{ type: action.type } };
    default:
      return { ...state };
  }
}
