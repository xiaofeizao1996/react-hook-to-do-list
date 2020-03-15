import { HttpRequestHeader } from 'antd/lib/upload/interface'

interface Option {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
    headers?: HttpRequestHeader
    ignoreToken?: boolean
}

interface RequestOption<T> extends Option {
    body?: T
}

interface NewOptions extends Option {
    headers: HttpRequestHeader
    body: string
}

interface Request {
    <T>(url: string, options: RequestOption<T>): Promise<any>
}

interface FetchError extends Error {
    url?: string
    status?: number
}

const handleFetchSuccess = async (response: Response) => {
    const { status, url } = response
    // const contentType = response.headers.get('content-type')
    let data = await response.text()
    try {
        data = JSON.parse(data)
    } catch (error) {
        console.log(error) // eslint-disable-line
    }
    return {
        data,
        status,
        url,
    }
}

const handleFetchFail = (response: any) => {
    const error: FetchError = new Error()
    error.url = response.url
    error.status = response.status
    throw error
}

const checkStatus = (res: any) => {
    const block = res
    const { status } = block
    if (status >= 200 && status < 300) {
        block.code = 1
    } else if (status === 400 || status === 404) {
        block.code = 0
        throw block
    } else {
        block.code = -1
        throw block
    }
    return block
}

const request: Request = (url, options) => {
    const { method = 'GET', body, ignoreToken = false } = options || {}
    const newOptions: NewOptions = {
        method,
        body: JSON.stringify(body),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
    }
    const token = localStorage.getItem('token')
    if (!ignoreToken && token) {
        newOptions.headers.Authorization = `Bearer ${token}`
    }
    return fetch(url, newOptions)
        .then(handleFetchSuccess, handleFetchFail)
        .then(checkStatus)
}

export default request
