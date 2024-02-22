import {
    ADD_MESSAGE,
    RECEIVE_MESSAGE,
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS,
    LOAD_MESSAGES_FAIL,
    AUTH_SIGNOUT_SUCCESS
} from '../constant/ActionTypes';

const initialState = {
    loaded: false,
    data: [],
    fetchHistory: [] // Corrected typo here from fetchHistoty to fetchHistory
};

export default function messages(state = initialState, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            return { ...state, data: [...state.data, action.message] };
        case RECEIVE_MESSAGE:
            return { ...state, data: [...state.data, action.message] };
        case LOAD_MESSAGES:
            return { ...state, loading: true };
        case LOAD_MESSAGES_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                loaded: true,
                fetchHistory: [...state.fetchHistory, { lastFetch: action.date, channelName: action.channel }],
                data: [...state.data.filter(message => message.channelID !== action.channel), ...action.json] // Assuming action.json is an array of messages
            };
        case LOAD_MESSAGES_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: action.error,
                data: [...state.data]
            };
        case AUTH_SIGNOUT_SUCCESS:
            return {
                loaded: false,
                data: [],
                fetchHistory: []
            };
        default:
            return state;
    }
}