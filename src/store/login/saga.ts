import { call, takeEvery, put } from 'redux-saga/effects'
import { getCaptcha, login } from 'services/login'
import { BACKEND_URL } from 'services/config'
import { push } from 'connected-react-router'
import { GET_CAPTCHA, LOGIN, LOGIN_SAVE } from './action'

function* getCaptchaRequeset() {
    try {
        const { data } = yield call(getCaptcha)
        yield put({
            type: LOGIN_SAVE,
            payload: {
                ...data,
                loading: false,
                captchaUrl: `${BACKEND_URL}${data.captchaUrl}`,
            },
        })
    } catch (err) {
        // yield put(push('/404'))
    }
}

function* loginRequeset(action: any) {
    const {
        payload: { username, password, captcha, hashKey },
    } = action
    try {
        const {
            data: { token },
        } = yield call(login, { username, password, captcha, hashKey })
        yield put({
            type: LOGIN_SAVE,
            payload: {
                token,
            },
        })
        yield put(push('/todo'))
    } catch (err) {
        const { data } = err
        yield put({
            type: LOGIN_SAVE,
            payload: {
                loading: false,
                error: data.error || data,
            },
        })
        yield put({ type: GET_CAPTCHA })
    }
}

function* loginSaga() {
    yield takeEvery(LOGIN, loginRequeset)
    yield takeEvery(GET_CAPTCHA, getCaptchaRequeset)
}

export { loginSaga }
