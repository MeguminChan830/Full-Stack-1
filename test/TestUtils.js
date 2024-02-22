import expect from 'expect'
import { applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from '../src/common/middleware/promiseMiddleware'
const middlewares = [thunkMiddleware, promiseMiddleware]

export function mockStore(getState, expectedActions, onLastAction) {
    if (!Array.isArray(expectedActions)) {
        throw new Error("expectedActions Should be a array Motherfucker!")
    }
    if (onLastAction !== undefined && typeof onLastAction !== 'function') throw new Error('OnlastActions should new undefined or function motherfucker nigga')
    function mockStoreWithoutMiddleware() {
        return {
            getState() {
                return typeof getState === 'function' ? getState() : getState
            },
            dispatch(action) {
                const expectedAction = expectedActions.shift()
                expect(action).toEqual(expectedAction)
                if (onLastAction && !expectedAction.length) {
                    onLastAction()
                }
                return action
            }
        }
    }
    const mockStoreWithMiddleware = applyMiddleware(
        ...middlewares
    )(mockStoreWithoutMiddleware)
    return mockStoreWithMiddleware()
}