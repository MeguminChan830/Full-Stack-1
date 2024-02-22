import * as types from '../constant/ActionTypes';

const initialState = '';

export default function welcome(state = initialState, action) {
    switch (action.type) {
        case types.SAVE_USERNAME:
            return action.username;
        case types.AUTH_SIGNOUT_SUCCESS:
            return '';
        default: 
            return state;
    }
}