import * as types from '../constant/ActionTypes'

const initialState = {
    isMobile: false,
    screenHeight: null,
    screenWidth: null
}
export default function enviroment(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_IS_MOBILE:
            return {
                ...state, isMobile: action.isMobile
            }
        case types.CHANGE_WIDTH_AND_HEIGHT:
            return {
                ...state, screenHeight: action.screenHeight, screenWidth: action.screenWidth
            }
        default:
            return state
    }
}