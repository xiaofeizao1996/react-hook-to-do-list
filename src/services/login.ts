import { BACKEND_URL } from './config'
import request from '../utils/request'

interface LoginProps {
  username: string
  password: string
  hashKey: string
  captcha: string
}
interface SignUpProps {
  username: string
  password: string
  passwordAgain: string
}

interface Services<T> {
  (body: T): Promise<any>
}

export const getCaptcha = () => request(`${BACKEND_URL}/captcha`)

export const login: Services<LoginProps> = body =>
  request(`${BACKEND_URL}/users/login`, {
    method: 'POST',
    body,
  })

export const signUp: Services<SignUpProps> = body =>
  request(`${BACKEND_URL}/users`, {
    method: 'POST',
    body,
  })
