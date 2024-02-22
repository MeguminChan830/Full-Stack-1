import {createStore, combineReducers, applyMiddleware, compose} from  'redux'
import promiseMiddleware from '../middleware/promiseMiddleware'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'
const finalCreateStore=compose(
    applyMiddleware(thunk. promiseMiddleware),
    DevTools.instrument()
)
(createStore)

export default function configureStore(initialState){
    const store= finalCreateStore(rootReducer, initialState)
    if(module.hot){
        module.hot.accept('../reducers', ()=>{
            const nextRootReducer= require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }
    return store
}
