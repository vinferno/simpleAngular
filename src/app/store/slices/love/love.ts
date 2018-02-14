import * as defaultState from './index.json';

export const LOVE_UPDATE_ONE = '[love] update one';

const types = {
	LOVE_UPDATE_ONE,
};

export const loveActions = {
	updateOne : (payload: any) => {
		return { type: LOVE_UPDATE_ONE, payload: payload };
	},
	types,
};

export function loveReducer (state: any = defaultState, action: any) {
	switch( action.type ) {
		case LOVE_UPDATE_ONE:
			return { ...state, ...{ one: action.payload.one }, ...{ type: action.type } };
		default:
			return state;
	}
}
