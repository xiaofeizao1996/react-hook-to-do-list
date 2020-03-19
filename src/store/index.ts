import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { LoginReducer } from './login'
import rootSaga from './saga'

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
    router: connectRouter(history),
    login: LoginReducer,
})
const store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware, routerMiddleware(history))),
)
sagaMiddleware.run(rootSaga)

type AppState = ReturnType<typeof rootReducer>
type AppDispatch = typeof store.dispatch
export { history, AppState, AppDispatch }
export default store
