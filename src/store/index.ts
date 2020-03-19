import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { LoginReducer } from './login'
import rootSaga from './saga'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const reducer = combineReducers({
    router: connectRouter(history),
    login: LoginReducer,
})
const store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware, routerMiddleware(history))),
)
sagaMiddleware.run(rootSaga)
export { history }
export default store
