import { BACKEND_URL } from './config'
import request from '../utils/request'

interface LoginProps {
    username: string
    password: string
    hashKey: string
    captcha: string
}

interface Login<T> {
    (body: T): Promise<any>
}

export const getCaptcha = () => request(`${BACKEND_URL}/captcha`)

export const login: Login<LoginProps> = body =>
    request(`${BACKEND_URL}/users/login`, {
        method: 'POST',
        body,
    })
