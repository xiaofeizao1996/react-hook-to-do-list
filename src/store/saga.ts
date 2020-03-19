import { all } from 'redux-saga/effects'
import { loginSaga } from './login'

function* rootSaga() {
    yield all([loginSaga()])
}

export default rootSaga
