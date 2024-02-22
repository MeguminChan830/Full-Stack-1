import {
    ADD_CHANNEL, 
    RECEIVE_CHANNEL, 
    LOAD_CHANNELS, 
    LOAD_CHANNELS_SUCCESS, 
    LOAD_CHANNELS_FAIL, 
    AUTH_SIGNOUT_SUCCESS
} from "../constant/ActionTypes";

const initialState = {
    loaded: false,
    data: []
};

export default function channels(state = initialState, action) {
    switch (action.type) {
        case ADD_CHANNEL:
            if (state.data.filter(channel => channel.name === action.channel.name).length !== 0) {
                return state;
            }
            return {
                ...state, 
                data: [...state.data, action.channel]
            };
        case RECEIVE_CHANNEL: 
            if (state.data.filter(channel => channel.name === action.channel.name).length > 0) return state;
            return {
                ...state,
                data: [...state.data, action.channel]
            };
        case LOAD_CHANNELS:
            return {
                ...state,
                loading: true
            };
        case LOAD_CHANNELS_SUCCESS: 
            return {
                ...state,
                loading: false,
                data: [...state.data, ...action.json] // Assuming action.json is an array of channels
            };
        case LOAD_CHANNELS_FAIL: 
            return {
                ...state, 
                loading: false,
                error: action.error,
                loaded: false
            };
        case AUTH_SIGNOUT_SUCCESS: 
            return {
                loaded: false,
                data: []
            };
        default: 
            return state;
    }
}