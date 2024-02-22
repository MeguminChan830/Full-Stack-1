import messages from './messages'
import channels from './channels'
import activeChannel from './activeChannel'
import auth from './auth'
import typers from './typers'
import welcomePage from './welcomePage'
import userValidation from './userValidation'
import enviroment from './enviroment'
import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
    messages,
    channels,
    activeChannel,
    auth,
    typers,
    welcomePage,
    userValidation,
    enviroment,
    formReducer
})
export default rootReducer

//action-> componnent