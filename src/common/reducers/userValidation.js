import {
    LOAD_USERVALIDATION,
    LOAD_USERVALIDATION_SUCCESS,
    LOAD_USERVALIDATION_FAIL
} from "../constant/ActionTypes";

const initialState = {
    loaded: false,
    data: []
};

export default function userValidation(state = initialState, action) {
    switch (action.type) {
        case LOAD_USERVALIDATION:
            return {
                ...state,
                loading: true
            };
        case LOAD_USERVALIDATION_SUCCESS:
            return {
                ...state, 
                loading: false,
                loaded: true,
                data: action.json // Assuming action.json is the data you want to set
            };
        case LOAD_USERVALIDATION_FAIL:
            return {
                ...state, 
                loading: false,
                loaded: false,
                error: action.error,
                data: [...state.data] // Keeping the previous data, consider if this is the desired behavior
            };
        default:
            return state;
    }
}