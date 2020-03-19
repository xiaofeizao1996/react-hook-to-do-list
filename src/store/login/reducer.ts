import { Action } from 'redux'
import { LOGIN, LOGIN_SAVE, LOGIN_SUCCESS, GET_CAPTCHA } from './action'

interface LoginAction extends Action {
    type: 'LOGIN' | 'LOGIN_SAVE' | 'LOGIN_SUCCESS' | 'GET_CAPTCHA'
    payload?: any
}

export interface LoginState {
    hashKey: string | null
    captchaUrl: string | null
    error: string | null
}

const initState: LoginState = {
    hashKey: null,
    captchaUrl: null,
    error: null,
}

export const LoginReducer = (state = initState, action: LoginAction): LoginState => {
    const { type, payload } = action
    switch (type) {
        case LOGIN_SUCCESS:
            return { ...state, ...payload }
        case LOGIN_SAVE:
            return { ...state, ...payload }
        case LOGIN:
        case GET_CAPTCHA:
        default:
            return {
                ...state,
            }
    }
}
