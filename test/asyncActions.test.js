import expect from 'expect'
import {applyMiddleware} from 'redux'
import * as actions from '../src/common/actions/actions'
import * as types from '../src/common/constant/ActionTypes'
import nock from 'nock'
import thunk from 'redux-thunk'
import promiseMiddleware from '../src/common/middleware/primiseMiddleware'
import configureStore from 'redux-mock-store'

const middlewares = [thunk, promiseMiddleware]
const mockStore = configureStore(middlewares)

describe('async actions', ()=>{
    afterEach(()=>{
        nock.cleanAll()
    })
    it('creaes LOAD_MESSAGE_SUCCESS when fetching messages has been done', done=>{
        const expectedActions=[
            {type: types.LOAD_MESSAGES},
            {type: types.LOAD_MESSAGES_SUCCESS, body: {messages: ['do something']}}
        ]
        const store = mockStore({messages: []}, expectedActions, done)
        store.dispatch(actions.fetchMessages())
        .then(()=>{
            const actualActions= store.getActions()
            expect (actualActions).toEqual(expectedActions)
            done()
        }).catch(err=>done(err))
    })
})