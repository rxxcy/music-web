import Axios, {
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios'

export const axios = Axios.create({
  baseURL: 'http://localhost:3090',
  timeout: 20 * 1e3,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface BaseResponse<T> {
  data: T
  code: number
  message?: string
}

// 请求拦截器
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers = config.headers || {}
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error: AxiosError) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // 在响应返回前做一些处理，例如统一处理错误码
    return response.data
    //  return {
    //     data: response.data,
    //     status: response.status,
    //   }
  },
  (error: AxiosError) => {
    // 处理响应错误
    console.log('响应拦截器处理错误', error)
    return Promise.reject(error)
  }
)
