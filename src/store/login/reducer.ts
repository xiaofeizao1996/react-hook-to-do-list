import { Action, Reducer } from 'redux'
import { LOGIN, LOGIN_SAVE, GET_CAPTCHA } from './action'

interface LoginAction extends Action {
  type: 'LOGIN' | 'LOGIN_SAVE' | 'GET_CAPTCHA'
  payload?: any
}

export interface LoginState {
  hashKey: string | null
  loading: boolean
  captchaUrl: string | null
  error: string | null
}

const initState: LoginState = {
  hashKey: null,
  loading: false,
  captchaUrl: null,
  error: null,
}

export const LoginReducer: Reducer<LoginState> = (state = initState, action: LoginAction) => {
  const { type, payload } = action
  switch (type) {
    case LOGIN_SAVE:
      return {
        ...state,
        ...payload,
      }
    case LOGIN:
      return {
        ...state,
        loading: true,
      }
    case GET_CAPTCHA:
    default:
      return {
        ...state,
      }
  }
}
